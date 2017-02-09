<template>

        <svg :width="width" :height="height">

            <g :transform="'translate(0,' + (height / 4) * -1 + ')'">

                <dots :dots="dots" :width="width"></dots>

                <route
                    :sourcex="lonScale(getAirport(source).lon)"
                    :sourcey="latScale(getAirport(source).lat)"
                    :targetx="lonScale(getAirport(target).lon)"
                    :targety="latScale(getAirport(target).lat)"
                    radius="4"
                ></route>

            </g>

        </svg>

</template>

<script>

    import { scaleLinear } from 'd3'
    import uniq from 'lodash.uniq'

    import Dots from './Dots.vue'
    import Route from './Route.vue'

    export default {
        components: { Dots, Route },
        props: {
            source: { default: '' },
            target: { default: '' },
            width: { default: 0 }
        },
        data: () => ({
            sourceDots: { features: [] },
            sourceAirports: []
        }),
        methods: {
            latScale(value) {
                return scaleLinear()
                    .domain([180, -180])
                    .range([10, this.height - 10])
                    (value)
            },
            lonScale(value) {
                return scaleLinear()
                    .domain([-180, 180])
                    .range([10, this.width - 10])
                    (value)
            },
            getAirport(code) {
                var airport = this.sourceAirports.find(airport => airport.iata === code)
                return airport ? airport : { lat: 0, lon: 0 }
            },
        },
        computed: {
            height() { return this.width },
            dots() {
                return this.sourceDots.features.map(dot => {
                    return {
                        lat: this.latScale(dot.geometry.coordinates[1]),
                        lon: this.lonScale(dot.geometry.coordinates[0]),
                        countries: dot.properties.countries
                    }
                })
            },
            /*countries() {
                var countries = []
                this.sourceDots.features.forEach(feature => {
                    countries.push(...feature.properties.countries)
                })
                return uniq(countries)
            }
            */
        },
        mounted() {
            this.$http.get('./data/airports.json').then(res => {
                this.sourceAirports = res.body
            })
            this.$http.get('./data/dots.json').then(res => {
                this.sourceDots = res.body
            })
        }
    }

</script>
