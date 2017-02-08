<template>

    <div id="app">
        <h2>Dottedmap2</h2>
        <h4>Width</h4>
        <input type="range" v-model="width" max="1600"> {{ width }}px
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
    h4 { margin: 0.5rem 0; }

</style>
