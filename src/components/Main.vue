<template>
    <main class="flex-shrink-0">
        <div class="container-fluid">
            <div class="row my-2">
                <div class="col-md-4">
                    <form v-on:change="isModified = true">
                        <div class="row">
                            <div class="col">
                                <InputRange
                                    v-model="paramN"
                                    class="InputRange--ParamN"
                                    v-bind:min="12"
                                    v-bind:max="360"
                                    label="Number of points" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <InputRange
                                    v-model="paramL"
                                    class="InputRange--ParamL"
                                    v-bind:min="1"
                                    v-bind:max="30"
                                    label="Number of layers" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <InputRange
                                    v-model="paramLL"
                                    class="InputRange--ParamLL"
                                    v-bind:min="1"
                                    v-bind:max="paramN * 2"
                                    label="Lines per layer" />
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
                                    v-model="paramM"
                                    class="InputRadio--ParamMSingle"
                                    option="single"
                                    label="Single" />
                                <InputRadio
                                    v-model="paramM"
                                    class="InputRadio--ParamMMultiple"
                                    option="multiple"
                                    label="Multiple" />
                            </div>
                        </div>
                        <div
                            v-if="paramM === 'multiple'"
                            class="row">
                            <div
                                v-for="(l, index) in paramL"
                                v-bind:key="index"
                                class="col-3 col-sm-2 col-md-3 col-xl-2 my-2">
                                <InputColor
                                    v-model="paramC.multiple[index]"
                                    class="InputColor--ParamC"
                                    v-bind:label="index + 1" />
                            </div>
                        </div>
                        <div
                            v-else-if="paramM === 'single'"
                            class="row">
                            <div class="col-3 col-sm-2 col-md-3 col-xl-2 my-2">
                                <InputColor
                                    v-model="paramC.single"
                                    class="InputColor--ParamC" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <InputRange
                                    v-model="paramN1"
                                    class="InputRange--ParamN1"
                                    v-bind:min="1"
                                    v-bind:max="50"
                                    label="First step" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <InputRange
                                    v-model="paramN2"
                                    class="InputRange--ParamN2"
                                    v-bind:min="2"
                                    v-bind:max="50"
                                    label="Second step" />
                            </div>
                        </div>
                        <div class="row my-3 justify-content-between">
                            <div class="col-12 col-xxl-4 order-3 order-xxl-1 mt-3 d-grid">
                                <button
                                    v-bind:disabled="!isModified"
                                    type="reset"
                                    class="btn btn-light"
                                    v-on:click.prevent="resetData">
                                    <BootstrapIcon icon="trash-fill" />
                                    Reset
                                </button>
                            </div>
                            <div class="col-12 col-xxl-4 order-2 mt-3 d-grid">
                                <button
                                    v-bind:data-clipboard-text="shareLink"
                                    type="button"
                                    class="btn btn-secondary CopyToClipboard">
                                    <BootstrapIcon icon="share-fill" />
                                    Share
                                </button>
                            </div>
                            <div class="col-12 col-xxl-4 order-1 order-xxl-3 mt-3 d-grid">
                                <button
                                    type="submit"
                                    class="btn btn-primary"
                                    v-on:click.prevent="download">
                                    <BootstrapIcon icon="cloud-arrow-down-fill" />
                                    Download
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-8">
                    <canvas
                        ref="canvas"
                        v-bind:width="width"
                        v-bind:height="height" />
                </div>
            </div>
        </div>
        <div
            class="position-fixed bottom-0 end-0 p-3"
            style="z-index: 5">
            <div
                ref="copyToClipboardToast"
                class="toast hide"
                role="alert"
                aria-live="assertive"
                aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        Share link copied to clipboard.
                    </div>
                    <button
                        type="button"
                        class="btn-close me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue';
import ClipboardJS from 'clipboard';

import { Base64 } from 'js-base64';
import { Toast } from 'bootstrap';
import hashSum from 'hash-sum';
import colors from '../data/apple-crayons.json';

const DEFAULT = {
    PARAM_N: 120,
    PARAM_L: 10,
    PARAM_LL: 60,
    PARAM_M: 'multiple',
    PARAM_C_SINGLE: '#ffffff',
    PARAM_C_MULTIPLE: colors,
    PARAM_N1: 1,
    PARAM_N2: 3,
    WIDTH: 1024,
    HEIGHT: 768,
};

export default defineComponent({
    name: 'Main',

    components: {
        InputColor: defineAsyncComponent(() => import('@/components/InputColor')),
        InputRange: defineAsyncComponent(() => import('@/components/InputRange')),
        InputRadio: defineAsyncComponent(() => import('@/components/InputRadio')),
    },

    data () {
        return {
            ctx: null,
            paramN: DEFAULT.PARAM_N,
            paramL: DEFAULT.PARAM_L,
            paramLL: DEFAULT.PARAM_LL,
            paramM: DEFAULT.PARAM_M,
            paramC: {
                single: DEFAULT.PARAM_C_SINGLE,
                multiple: Array.from(DEFAULT.PARAM_C_MULTIPLE),
            },
            paramN1: DEFAULT.PARAM_N1,
            paramN2: DEFAULT.PARAM_N2,
            width: DEFAULT.WIDTH,
            height: DEFAULT.HEIGHT,
            cx: parseInt(DEFAULT.WIDTH / 2, 10),
            cy: parseInt(DEFAULT.HEIGHT / 2, 10),
            rad: parseInt(DEFAULT.HEIGHT / 2 - 20, 10),
            isModified: false,
        };
    },

    computed: {
        circlePoints () {
            const n = this.paramN;
            const alpha = (Math.PI * 2) / n;
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
                const offset = Math.round(this.paramN / this.paramL) * i;
                const color = this.paramM === 'multiple'
                    ? this.paramC.multiple[i]
                    : this.paramC.single;

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

                    linePoints.push({
                        start,
                        end,
                        color,
                    });

                    count++;

                    if (count >= this.paramLL) loop = false;
                }
            }

            this.$emit('update-lines', linePoints.length);

            return linePoints;
        },

        dataHash () {
            return {
                paramN: this.paramN,
                paramL: this.paramL,
                paramLL: this.paramLL,
                paramM: this.paramM,
                paramC: this.paramC,
                paramN1: this.paramN1,
                paramN2: this.paramN2,
            };
        },

        shareLink () {
            return `${window.location.href}#${Base64.encode(JSON.stringify(this.dataHash))}`;
        },

        dataSum () {
            return hashSum(this.dataHash);
        },
    },

    watch: {
        paramN () {
            this.$nextTick(() => this.drawCanvas());
        },

        paramL () {
            this.$nextTick(() => this.drawCanvas());
        },

        paramLL () {
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

        paramM () {
            this.$nextTick(() => this.drawCanvas());
        },
    },

    mounted () {
        // Prepare canvas.
        this.ctx = this.$refs.canvas.getContext('2d');
        this.ctx.width = this.width;
        this.ctx.height = this.height;

        // Setup the share link button and associated toast message.
        if (this.$refs.copyToClipboardToast) {
            const toast = new Toast(this.$refs.copyToClipboardToast);
            new ClipboardJS('.CopyToClipboard').on('success', () => toast.show());
        }

        // Load the data and draw the lines.
        this.loadData();
        this.drawCanvas();

        // Whenever the hash value is changed, try to load the data from it.
        window.addEventListener('hashchange', this.loadData);
    },

    beforeUnmount () {
        window.removeEventListener('hashchange', this.loadData);
    },

    methods: {
        setData (data) {
            this.paramN = data.paramN;
            this.paramL = data.paramL;
            this.paramLL = data.paramLL;
            this.paramM = data.paramM;
            this.paramC = data.paramC;
            this.paramN1 = data.paramN1;
            this.paramN2 = data.paramN2;
            this.isModified = false;
        },

        loadData () {
            /* eslint-disable no-restricted-globals */
            if (location.hash) {
                try {
                    const base64 = location.hash.substring(1);
                    const data = JSON.parse(Base64.decode(base64));
                    this.setData(data);
                }
                catch (err) {
                    // eslint-disable-next-line no-console
                    console.error('Error parsing data, please check your link.', err);
                }

                // Clear the hash value by replacing the current history state.
                history.replaceState('', document.title, window.location.pathname + window.location.search);
            }
            /* eslint-enable no-restricted-globals */
        },

        resetData () {
            this.setData({
                paramN: DEFAULT.PARAM_N,
                paramL: DEFAULT.PARAM_L,
                paramLL: DEFAULT.PARAM_LL,
                paramM: DEFAULT.PARAM_M,
                paramC: {
                    single: DEFAULT.PARAM_C_SINGLE,
                    multiple: Array.from(DEFAULT.PARAM_C_MULTIPLE),
                },
                paramN1: DEFAULT.PARAM_N1,
                paramN2: DEFAULT.PARAM_N2,
            });
        },

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
                `stringulator-${this.dataSum}.png`
            );
            document.body.appendChild(link);

            // Don't actually download the file in the testing environment.
            if (window.Cypress) return;

            link.click();
            link.remove();
        },
    },
});
</script>

<style lang="scss">
main {
    canvas {
        max-width: 100%;
        border-radius: 0.25rem;
    }
}
</style>
