<template>
    
    <div>
        <h4>Airport routes</h4>

        <div style="display: flex; margin-bottom: 0.5rem;">
            <input v-model="source1" size="4">&nbsp;
            <input v-model="target1" size="4">
        </div>

        <div style="display: flex; margin-bottom: 0.5rem;">
            <input v-model="source2" size="4">&nbsp;
            <input v-model="target2" size="4">
        </div>

        <h4>Countries</h4>

    <div style="display: flex">

        <div>
            <div v-for="country in countries"
                @click="activeCountry = country"
                :style="{
                    background: (activeCountry === country) ? 'rgba(255,255,255,0.7)' : 'none',
                    padding: '0.25rem'
                }"
            >
                {{ country }}
            </div>
        </div>

        <svg :width="width" :height="height" style="margin-top: -200px">

            <g :transform="'translate(0,' + (height / 4) * -1 + ')'">

            <circle
                v-for="point in points.features"
                :cx="lonScale(point.geometry.coordinates[0])"
                :cy="latScale(point.geometry.coordinates[1])"
                :r="radius"
                :fill="isActive(point.properties.countries) ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'"
            />

            <route
                :source="source1"
                :target="target1"
                :width="width"
                :radius="radius * 1.2"
            ></route>

            <route
                :source="source2"
                :target="target2"
                :width="width"
                :radius="radius * 1.2"
            ></route>

            </g>

        </svg>

    </div>

    </div>

</template>

<script>

    import * as d3 from 'd3'
    import _ from 'lodash'

    import points from './dots.json'

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
            source1: 'TLL',
            target1: 'CPH',
            source2: 'CPH',
            target2: 'RGN'
        }),
        computed: {
            radius() {
                return this.width / 350
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

        }
    }

</script>

<style>
</style>
