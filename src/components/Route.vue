<template>
    
    <g v-if="this.getAirport(this.source).lat !== 0 && this.getAirport(this.source).lon !== 0">
            <path
                :d="arc(
                    lonScale(getAirport(source).lon),
                    latScale(getAirport(source).lat),
                    lonScale(getAirport(target).lon),
                    latScale(getAirport(target).lat)
                )"
                stroke="white"
                fill="none"
                stroke-width="2"
            />

            <circle
                :cx="lonScale(getAirport(source).lon)"
                :cy="latScale(getAirport(source).lat)"
                :r="radius"
                fill="white"
            />

            <circle
                :cx="lonScale(getAirport(target).lon)"
                :cy="latScale(getAirport(target).lat)"
                :r="radius"
                fill="white"
            />

    </g>

</template>

<script>

    import * as d3 from 'd3'
    import turf from '@turf/turf'
    import _ from 'lodash'

    import rawCountries from './countries.json'
    import rawAirports from './airports.json'

    export default {
        props: {
            source: { default: '' },
            target: { default: '' },
            radius: { default: 5 },
            width: { default: 0 }
        },
        data: () => ({
            latMin: 180,
            latMax: -180,
            lonMin: -180,
            lonMax: 180,
        }),
        computed: {
            airports() {
                return rawAirports.filter(airport => {
                    return airport.hasOwnProperty('lat');
                })
            },
            height() {
                return this.width
            },
        },
        methods: {
            getAirport(code) {
                var airport = this.airports.find(airport => airport.iata === code)
                return airport ? airport : { lat: 0, lon: 0 }
            },
            arc(x1, y1, x2, y2) {
                if (x1 >= x2) {
                    var tmpx2 = x2; x2 = x1; x1 = tmpx2
                    var tmpy2 = y2; y2 = y1; y1 = tmpy2
                } 
                var dx = x2 - x1
                var dy = y2 - y1
                var dr = Math.sqrt(dx * dx + dy * dy)
                
                return "M" + x1 + "," + y1 + "A" + dr + "," + dr +
                " 0 0,1 " + x2 + "," + y2
            },
            latScale(value) {
                return d3.scaleLinear()
                    .domain([this.latMin, this.latMax])
                    .range([10, this.height - 10])
                    (value)
            },
            lonScale(value) {
                return d3.scaleLinear()
                    .domain([this.lonMin, this.lonMax])
                    .range([10, this.width - 10])
                    (value)
            },

        },
        mounted() {
            console.debug()
        }

    }

</script>

<style>
</style>
