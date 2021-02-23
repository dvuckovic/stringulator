<template>
    <main class="flex-shrink-0">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 my-2">
                    <div class="row">
                        <div class="col">
                        <InputRange
                            v-model="paramN"
                            v-bind:min="12"
                            v-bind:max="360"
                            label="Number of points" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <InputRange
                                v-model="paramL"
                                v-bind:min="1"
                                v-bind:max="30"
                                label="Number of layers" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="form-label">Layer color</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <InputRadio
                                v-model="colorMode"
                                option="single"
                                label="Single" />
                            <InputRadio
                                v-model="colorMode"
                                option="multiple"
                                label="Multiple" />
                        </div>
                    </div>
                    <div
                        v-if="colorMode === 'multiple'"
                        class="row">
                        <div
                            v-for="(l, index) in paramL"
                            v-bind:key="index"
                            class="col-3 col-sm-2 col-md-3 col-xl-2 my-2">
                            <InputColor
                                v-model="paramC[index]"
                                v-bind:label="index + 1" />
                        </div>
                    </div>
                    <div
                        v-else-if="colorMode === 'single'"
                        class="row">
                        <div class="col-3 col-sm-2 col-md-3 col-xl-2 my-2">
                            <InputColor v-model="paramC[0]" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <InputRange
                                v-model="paramN1"
                                v-bind:min="1"
                                v-bind:max="50"
                                label="First step" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <InputRange
                                v-model="paramN2"
                                v-bind:min="2"
                                v-bind:max="50"
                                label="Second step" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                        <InputRange
                            v-model="paramX"
                            v-bind:min="-0.99"
                            v-bind:max="0.99"
                            setp="0.01"
                            label="Center X displacement" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                        <InputRange
                            v-model="paramY"
                            v-bind:min="-0.99"
                            v-bind:max="0.99"
                            setp="0.01"
                            label="Center Y displacement" />
                        </div>
                    </div>
                </div>
                <div class="col-md-8 mt-2">
                    <canvas
                        ref="canvas"
                        v-bind:width="width"
                        v-bind:height="height" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import colors from '../data/apple-crayons.json';

export default {
    name: 'Main',

    components: {
        InputColor: defineAsyncComponent(() => import('@/components/InputColor')),
        InputRange: defineAsyncComponent(() => import('@/components/InputRange')),
        InputRadio: defineAsyncComponent(() => import('@/components/InputRadio')),
    },

    data() {
        const width = 1024;
        const height = 768;

        return {
            ctx: null,
            paramN: 120,
            paramL: 10,
            paramC: colors,
            paramN1: 1,
            paramN2: 3,
            paramX: 0.5,
            paramY: 0.0,
            colorMode: 'multiple',
            width,
            height,
            cx: width / 2,
            cy: height / 2,
            rad: height / 2 - 20,
        };
    },

    computed: {
        circlePoints () {
            # method: drawing two circles, the first centered in (0, 0) and
            # the second centered at (x_offset, y_offset).
            # For each point in the upper semicircle of the first circle, we draw
            # a line joining that point with (0, 0), and intersect such line with the
            # displaced circle

            const n_points = this.paramN;
            const r = 1.0;

            // find formula of second circle (x - h) ^ 2 + (y - k) ^ 2 = r ^ 2
            const h = this.paramX;
            const k = this.paramY;

            const alpha = Math.PI * 2 / n_points;
            const points = [];

            // loop all points of the top half of the first circle
            // TODO: the previous loop was ranging from -1 to n-1 and adding a point each iteration (total of n+1 points)
            //       whereas the current is ranging from 0 to n/2 and adding two points each iteration
            //       (total of n+2 if n is even, n+1 if n is odd)
            let i = 0;
            while (i <= n_points / 2) {
                const theta = alpha * i;
                const xc1 = Math.cos(theta) * r;
                const yc2 = Math.sin(theta) * r;

                // for each point, find line y = m*x + n passing by (0,0) and (x,y)
                const n = 0;
                const m = (yc1 - n) / xc1;

                // and find both intersections of such line with the second circle
                // { (x - h) ^ 2 + (y - k) ^ 2 = r ^ 2
                // { y = m * x + n
                // -----------------------------------
                // (1 + m^2) * x^2 + (2mn - 2h - 2mk) * x + (h^2 + n^2 + k^2 - r^2 - 2nk) = 0
                const a = 1 + Math.pow(m, 2);
                const b = 2 * m * n - 2 * h - 2 * m * k;
                const c = Math.pow(h, 2) + Math.pow(n, 2) + Math.pow(k, 2) - Math.pow(r, 2) - 2 * n * k;
                const x1 = (0 - b + Math.sqrt(Math.pow(b, 2) - 4 * a * c) ) / (2 * a);
                const x2 = (0 - b - Math.sqrt(Math.pow(b, 2) - 4 * a * c) ) / (2 * a);
                const y1 = m * x1 + n;
                const y2 = m * x2 + n;

                // recenter second circle to (0, 0) and store the intersections found in that circle
                // scale the points according to rad
                // recenter second circle to (cx, cy)
                // store the points
                points.push({
                    x: (x1 - h) * this.rad + this.cx,
                    y: (y1 - k) * this.rad + this.cy,
                });
                points.push({
                    x: (x2 - h) * this.rad + this.cx,
                    y: (y2 - k) * this.rad + this.cy,
                });

                i += 1;
            }

            return points;
        },

        linePoints () {
            const linePoints = [];

            for (let i = 0; i < this.paramL; i++) {
                const offset = Math.round(this.paramN / this.paramL) * i;
                const color = this.colorMode === 'multiple'
                    ? this.paramC[i]
                    : this.paramC[0];

                let s = 0 + offset;
                let e = 0 + offset;
                let loop = true;
                let count = 0;

                while (loop) {
                    s += this.paramN1;
                    e += this.paramN2;

                    while (s >= this.circlePoints.length - 1) s -= this.circlePoints.length - 1;
                    while (e >= this.circlePoints.length - 1) e -= this.circlePoints.length - 1;

                    const start = this.circlePoints[s];
                    const end = this.circlePoints[e];

                    if (
                        count >= parseInt(this.paramN / this.paramN2, 10)
                            + parseInt(this.paramN / (this.paramN2 * this.paramN2), 10)
                    ) {
                        loop = false;
                    }

                    linePoints.push({
                        start,
                        end,
                        color,
                    });

                    count++;
                }
            }

            this.$emit('update-lines', linePoints.length);

            return linePoints;
        },
    },

    watch: {
        paramN () {
            this.$nextTick(() => this.drawCanvas());
        },

        paramL () {
            this.$nextTick(() => this.drawCanvas());
        },

        paramC: {
            handler () {
                this.$nextTick(() => this.drawCanvas());
            },
            deep: true,
        },

        paramN1 () {
            this.$nextTick(() => this.drawCanvas());
        },

        paramN2 () {
            this.$nextTick(() => this.drawCanvas());
        },

        paramX () {
            this.$nextTick(() => this.drawCanvas());
        },

        paramY () {
            this.$nextTick(() => this.drawCanvas());
        },

        colorMode () {
            this.$nextTick(() => this.drawCanvas());
        },
    },

    mounted () {
        // Prepare canvas.
        this.ctx = this.$refs.canvas.getContext('2d');
        this.ctx.width = this.width;
        this.ctx.height = this.height;

        this.drawCanvas();
    },

    methods: {
        drawCanvas () {
            // Clear canvas.
            this.ctx.fillStyle = '#212529';
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.drawLines();
            this.drawCircle();
        },

        drawCircle () {
            this.ctx.fillStyle = '#ffffff';

            this.circlePoints.forEach((point) => {
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.fill();
            });
        },

        drawLines () {
            this.ctx.lineWidth = 0.25;

            this.linePoints.forEach((points) => {
                if (typeof points.start === 'undefined') return;
                if (typeof points.end === 'undefined') return;
                this.ctx.strokeStyle = points.color;
                this.ctx.beginPath();
                this.ctx.moveTo(points.start.x, points.start.y);
                this.ctx.lineTo(points.end.x, points.end.y);
                this.ctx.closePath();
                this.ctx.stroke();
            });
        },

        download () {
            const link = document.createElement('a');
            link.href = this.$refs.canvas.toDataURL('image/png;base64');
            link.setAttribute(
                'download',
                `stringulator-${this.paramN}-${this.paramL}-${this.paramN1}-${this.paramN2}.svg`
            );
            document.body.appendChild(link);

            // Don't actually download the file in the testing environment.
            if (window.Cypress) return;

            link.click();
            link.remove();
        },
    },
};
</script>

<style lang="scss">
main {
    canvas {
        max-width: 100%;
    }
}
</style>
