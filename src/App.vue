<template>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
    name: 'App',

    components: {
        HelloWorld,
    },

    mounted () {
        // Dynamically import the Bootstrap library, because it's not SSR-friendly.
        import('bootstrap');
    },
};
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
