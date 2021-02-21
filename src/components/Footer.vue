<template>
    <footer class="footer mt-auto py-3 bg-dark">
        <div class="container-fluid">
            <div class="row justify-content-between align-items-center">
                <div class="col-auto">
                    <span class="text-muted">
                        {{ lines }} lines
                    </span>
                </div>
                <div class="col-auto">
                    <button
                        type="button"
                        class="btn btn-outline-light"
                        v-on:click="download">
                        Download
                    </button>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',

    props: {
        lines: {
            type: Number,
        },
    },

    methods: {
        download () {
            this.$emit('download');
        },
    },
};
</script>
