<template>

    <div id="app">
        <h2>Dottedmap2</h2>
        <h4>Width</h4>
        <input type="range" v-model="width" max="1600"> {{ width }}px
        <dots :width="width"></dots>
    </div>

</template>

<script>

    import Dots from './components/Dots.vue'

    export default {
        name: 'App',
        components: { Dots },
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
