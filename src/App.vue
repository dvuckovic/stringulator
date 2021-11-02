<template>
    <div class="d-flex flex-column h-100">
        <StringulatorNavigation />
        <StringulatorMain v-on:update-lines="updateLines" />
        <StringulatorFooter v-bind:lines="lines" />
    </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue';

import 'bootstrap';

export default defineComponent({
    name: 'App',

    components: {
        StringulatorMain: defineAsyncComponent(() => import('@/components/StringulatorMain')),
        StringulatorNavigation: defineAsyncComponent(() => import('@/components/StringulatorNavigation')),
        StringulatorFooter: defineAsyncComponent(() => import('@/components/StringulatorFooter')),
    },

    data () {
        return {
            lines: 0,
        };
    },

    methods: {
        updateLines (lines) {
            this.lines = lines;
        },
    },
});
</script>

<style lang="scss">
// Bootstrap colors.
//   https://coolors.co/7952b3-42484c-c8ccd0-212529-ffffff
$primary: #7952b3;
$secondary: #42484c;
$light: #c8ccd0;
$dark: #212529;
$white: #ffffff;

@import 'node_modules/bootstrap/scss/bootstrap';
</style>
