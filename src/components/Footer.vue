<template>
    <footer class="footer mt-auto py-3 bg-dark Footer">
        <div class="container-fluid">
            <div class="row justify-content-between align-items-center">
                <div class="col-auto">
                    <span class="text-muted Footer__Lines">
                        {{ lines }} lines
                    </span>
                </div>
                <div class="col-auto">
                    <span class="text-muted Footer__Version">
                        v{{ version }}
                    </span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { defineComponent } from 'vue';
import { version } from '../../package.json';

export default defineComponent({
    name: 'Footer',

    props: {
        lines: {
            type: Number,
        },
    },

    computed: {
        version () {
            return version;
        },
    },

    methods: {
        download () {
            this.$emit('download');
        },
    },
});
</script>
