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
import Main from '@/components/Main';

export default {
    name: 'App',

    components: {
        // Template refs are currently not working properly on async components.
        //   More info: https://github.com/vuejs/vue-next/issues/3188
        Main,
        Navigation: defineAsyncComponent(() => import('@/components/Navigation')),
        Footer: defineAsyncComponent(() => import('@/components/Footer')),
    },

    data () {
        return {
            lines: 0,
        };
    },

    methods: {
        download () {
            return this.$refs.main && this.$refs.main.download();
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
