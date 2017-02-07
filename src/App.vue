<template>

    <div id="app">
        <p>Map size: <input type="range" v-model="width" max="1600"> {{ width }}px</p>
        <dottedmap :width="width"></dottedmap>
    </div>

</template>

<script>

    import Dottedmap from './components/Dottedmap.vue'

    export default {
        name: 'App',
        components: { Dottedmap },
        data: () => ({ width: 700 })
    }

</script>

<style>

    body {
        font-family: sans-serif;
        margin: 0;
        padding: 2rem;
        background: orange;
    }

</style>
