<template>
    <main class="flex-shrink-0">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 mt-2">
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
                            <label class="form-label">Layer colors</label>
                        </div>
                    </div>
                    <div class="row">
                        <div
                            v-for="(l, index) in paramL"
                            v-bind:key="index"
                            class="col-2 my-2">
                            <InputColor v-model="paramC[index]" />
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
            width,
            height,
            cx: width / 2,
            cy: height / 2,
            rad: height / 2 - 20,
        };
    },

    computed: {
        circlePoints () {
            const n = this.paramN;
            const alpha = Math.PI * 2 / n;
            const points = [];

            let i = -1;

            while (i < n) {
                const theta = alpha * i;

                points.push({
                    x: (Math.cos(theta) * this.rad) + this.cx,
                    y: (Math.sin(theta) * this.rad) + this.cy,
                });

                i += 1;
            }

            return points;
        },

        linePoints () {
            const linePoints = [];

            for (let i = 0; i < this.paramL; i++) {
                const offset = parseInt(this.paramN / this.paramL) * i;
                const color = this.paramC[i];

                let s = 0 + offset;
                let e = 1 + offset;
                let loop = true;
                let count = 0;

                while (loop) {
                    s += this.paramN1;
                    e += this.paramN2;

                    while (s >= this.circlePoints.length) s -= this.circlePoints.length;
                    while (e >= this.circlePoints.length) e -= this.circlePoints.length;

                    const start = this.circlePoints[s];
                    const end = this.circlePoints[e];

                    if (
                        start === end
                        || count >= this.paramN
                            + parseInt(this.paramN/this.paramN2, 10)
                            + parseInt(this.paramN/this.paramN2^2, 10)
                            + 1
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