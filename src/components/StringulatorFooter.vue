<template>
    <footer class="footer mt-auto py-3 bg-dark StringulatorFooter">
        <div class="container-fluid">
            <div class="row justify-content-between align-items-center">
                <div class="col-auto">
                    <span class="text-muted StringulatorFooter__Lines">
                        {{ lines }} lines
                    </span>
                </div>
                <div class="col-auto">
                    <span class="text-muted StringulatorFooter__Version">
                        v{{ version }}
                    </span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { defineComponent } from 'vue';
import packageJson from '../../package.json';

export default defineComponent({
    name: 'StringulatorFooter',

    props: {
        lines: {
            type: Number,
        },
    },

    computed: {
        version () {
            return packageJson.version;
        },
    },

    methods: {
        download () {
            this.$emit('download');
        },
    },
});
</script>
