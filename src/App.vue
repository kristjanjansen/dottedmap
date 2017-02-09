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

        </div>

        <svg :width="width" :height="height">

            <g :transform="'translate(0,' + (height / 4) * -1 + ')'">

                <dots :dots="dots" :width="width" :height="height"></dots>

                <route
                    :sourcex="lonScale(getAirport(source).lon)"
                    :sourcey="latScale(getAirport(source).lat)"
                    :targetx="lonScale(getAirport(target).lon)"
                    :targety="latScale(getAirport(target).lat)"
                    radius="4"
                ></route>

            </g>

        </svg>

    </div>

</template>

<script>

    import * as d3 from 'd3'

    import Dots from './components/Dots.vue'
    import Route from './components/Route.vue'

    import rawDots from './components/dots.json'
    import rawAirports from './components/airports.json'

    export default {
        name: 'App',
        components: { Dots, Route },
        methods: {
            latScale(value) {
                return d3.scaleLinear()
                    .domain([180, -180])
                    .range([10, this.height - 10])
                    (value)
            },
            lonScale(value) {
                return d3.scaleLinear()
                    .domain([-180, 180])
                    .range([10, this.width - 10])
                    (value)
            },
            getAirport(code) {
                var airport = rawAirports.find(airport => airport.iata === code)
                return airport ? airport : { lat: 0, lon: 0 }
            },
        },
        computed: {
            height() { return this.width },
            dots() {
                return rawDots.features.map(dot => {
                    return {
                        lat: this.latScale(dot.geometry.coordinates[1]),
                        lon: this.lonScale(dot.geometry.coordinates[0]),
                        countries: dot.properties.countries
                    }
                })
            }
        },
        data: () => ({
            source: 'TLL',
            target: 'RGN',
            width: 700
        })
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
