<template>
    <div class="d-flex flex-column h-100">
        <Navigation />
        <Main
            ref="main"
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
        };
    },

    methods: {
        download () {
            this.$refs.main.download();
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
