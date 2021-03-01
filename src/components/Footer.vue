<template>
    <footer class="footer mt-auto py-3 bg-dark">
        <div class="container-fluid">
            <div class="row justify-content-between align-items-center">
                <div class="col">
                    <span class="text-muted">
                        {{ lines }} lines
                    </span>
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
