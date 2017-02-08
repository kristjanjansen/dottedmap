<template>

    <div id="app">
        <p>Map size: <input type="range" v-model="width" max="1600"> {{ width }}px</p>
        <dottedmap2 :width="width"></dottedmap2>
    </div>

</template>

<script>

    import Dottedmap2 from './components/Dottedmap2.vue'

    export default {
        name: 'App',
        components: { Dottedmap2 },
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
