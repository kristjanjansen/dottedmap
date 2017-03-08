<template>

    <div>
    
        <div id="app">
            
            <h2>Dottedmap</h2>
            
            <h4>Width</h4>
            
            <input type="range" v-model="width" max="1600"> {{ width }}px
            
            <h4>Flight route</h4>

            <div style="display: flex; margin-bottom: 0.5rem;">
                <input v-model="source" size="4">&nbsp;
                <input v-model="target" size="4">
            </div>

            <h4>Countries</h4>

            <div>
                <span
                     v-for="country in countries"
                     @click="$events.$emit('dotmap.activeCountry', country)"
                     style="font-size: 15px; cursor: pointer"
                >
                    {{ country }}
                </span>
            </div>

        </div>

        <dotmap :width="width" :source="source" :target="target"></dotmap>

    </div>

</template>

<script>

    import uniq from 'lodash.uniq'

    import Dotmap from './components/Dotmap.vue'

    export default {
        name: 'App',
        components: { Dotmap },
        data: () => ({
            source: 'TLL',
            target: 'RGN',
            width: 700,
            countries: []
        }),
        mounted() {
            this.$http.get('./data/dots.json').then(res => {
                var countries = []
                res.body.features.forEach(feature => {
                    countries.push(...feature.properties.countries)
                })
                this.countries = uniq(countries)
                this.$events.$emit('dotmap.activeCountry', 'IT')
            })
        }
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
