<template>

    <div id="app">
        <input type="range" v-model="width" max="1600">
        <dottedmap :width="width"></dottedmap>
    </div>

</template>

<script>

    import Dottedmap from './components/Dottedmap.vue'

    export default {
        name: 'App',
        components: { Dottedmap },
        data: () => ({ width: 500 })
    }

</script>

<style>

    body {
        font-family: sans-serif;
        margin: 0;
        padding: 2rem;
    }

</style>
