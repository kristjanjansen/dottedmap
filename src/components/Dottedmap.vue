<template>
    
    <div>

        <svg :width="width" :height="height">

            <circle
                v-for="point in points"
                :cx="lonScale(point.lon)"
                :cy="latScale(point.lat)"
                r="3"
                fill="gray"
            />

        </svg>

    </div>

</template>

<script>

    import * as d3 from 'd3'
    import turf from '@turf/turf'
    import countries from './countries.json'
    export default {
        props: {
            width: { default: 500 }
        },
        data: () => ({
            step: 5,
            latMin: -180,
            latMax: 180,
            lonMin: -180,
            lonMax: 180,
            points: []
        }),
        computed: {
            height() {
                return this.width
            }
        },
        methods: {
            latScale(value) {
                return d3.scaleLinear()
                    .domain([this.latMin, this.latMax])
                    .range([this.width - 10, 10])
                    (value)
            },
            lonScale(value) {
                return d3.scaleLinear()
                    .domain([this.lonMin, this.lonMax])
                    .range([10, this.height - 10])
                    (value)
            },
            getPoint: function(lat, lon) {
                var point = false
                countries.features.forEach(function(country) {
                    if (country.geometry.type === 'Polygon' &&
                        turf.inside(
                            turf.point([lon, lat]),
                            turf.polygon(country.geometry.coordinates)
                        )
                    ) { 
                        point = true
                    }
                    if (country.geometry.type === 'MultiPolygon') {
                        country.geometry.coordinates.forEach(function(polygon) {
                            if (turf.inside(
                                turf.point([lon, lat]),
                                turf.polygon(polygon))
                            ) {
                                point = true
                            }
                        })
                    }
                })
                return point
            }

        },
        mounted() {
            for (var lat = this.latMin; lat < this.latMax; lat += this.step) {
                for (var lon = this.lonMin; lon < this.lonMax; lon += this.step) {
                    if (this.getPoint(lat, lon)) {
                        this.points.push({
                            lat, lon
                        })
                    }
                }
            }
        }
    }

</script>

<style>
</style>
