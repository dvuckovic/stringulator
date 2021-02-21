<template>
    <div class="d-flex flex-column h-100">
        <Navigation />
        <Main
            v-bind:start-download="startDownload"
            v-on:update-lines="updateLines" />
        <Footer
            v-bind:lines="lines"
            v-on:download="download" />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    name: 'App',

    components: {
        Navigation: defineAsyncComponent(() => import('@/components/Navigation')),
        Main: defineAsyncComponent(() => import('@/components/Main')),
        Footer: defineAsyncComponent(() => import('@/components/Footer')),
    },

    data () {
        return {
            lines: 0,
            startDownload: false,
        };
    },

    methods: {
        download () {
            this.startDownload = true;
            this.$nextTick(() => {
                this.startDownload = false;
            });
        },

        updateLines (lines) {
            this.lines = lines;
        },
    },
};
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
</style>
