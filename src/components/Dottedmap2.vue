<template>
    
    <div style="display: flex">
        
        <div>
            <div v-for="country in countries"
                @click="activeCountry = country"
                :style="{
                    background: (activeCountry === country) ? 'rgba(0,0,0,0.25)' : 'none',
                    padding: '0.25rem'
                }"
            >
                {{ country }}
            </div>
        </div>

        <svg :width="width" :height="height">

            <circle
                v-for="point in points.features"
                :cx="lonScale(point.geometry.coordinates[0])"
                :cy="latScale(point.geometry.coordinates[1])"
                :r="radius"
                :fill="isActive(point.properties.countries) ? 'white' : 'rgba(0,0,0,0.5)'"
            />

            <route
                source="TLL"
                target="LAX"
                :width="width"
                :radius="radius"
            ></route>

        </svg>

    </div>

</template>

<script>

    import * as d3 from 'd3'
    import _ from 'lodash'

    import points from './points.json'

    import Route from './Route.vue'

    export default {
        components: { Route },
        props: {
            width: { default: 0 }
        },
        data: () => ({
            points: points,
            activeCountry: '',
            latMin: 180,
            latMax: -180,
            lonMin: -180,
            lonMax: 180,
        }),
        computed: {
            radius() {
                return this.width / 300
            },
            height() {
                return this.width
            },
            countries() {
                var countries = []

                points.features.forEach(feature => {
                    countries.push(...feature.properties.countries)
                })

                return _.uniq(countries)
            }
            
        },
        methods: {
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
            isActive(countries) {
                return countries.find(country => country === this.activeCountry)
            }

        },
        mounted() {

        }
    }

</script>

<style>
</style>
