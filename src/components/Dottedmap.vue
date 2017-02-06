<template>
    
    <div>
        <div style="display:flex">
            <div style="flex:1">
                <input v-model="airport1">
                <div>
                </div>
            </div>
            <div style="flex:1">
                <input v-model="airport2">
                <div>
                </div>
            </div>
            <div style="flex:1">
                <button @click="randomAirports">Random</button>
            </div>
            <div style="flex:1">
                {{ point }}
            </div>
        </div>

        <svg :width="width" :height="height">

            <circle
                v-for="point in points"
                :cx="lonScale(point.lon)"
                :cy="latScale(point.lat)"
                r="3"
                fill="black"
                :data-lat="point.lat"
                :data-lon="point.lon"
                opacity="0.2"
                @click="inspect(point)"
            />

            <path
                :d="arc(
                    lonScale(getAirport(airport1).lon),
                    latScale(getAirport(airport1).lat),
                    lonScale(getAirport(airport2).lon),
                    latScale(getAirport(airport2).lat)
                )"
                stroke="white"
                fill="none"
                stroke-width="2"
            />

            <circle
                :cx="lonScale(getAirport(airport1).lon)"
                :cy="latScale(getAirport(airport1).lat)"
                r="3"
                fill="white"
                :data-lat="point.lat"
                :data-lon="point.lon"
            />

            <circle
                :cx="lonScale(getAirport(airport2).lon)"
                :cy="latScale(getAirport(airport2).lat)"
                r="3"
                fill="white"
            />

        </svg>

    </div>

</template>

<script>

    import * as d3 from 'd3'
    import turf from '@turf/turf'
    import _ from 'lodash'

    import countries from './countries.json'
    import rawAirports from './airports.json'
    export default {
        props: {
            width: { default: 500 }
        },
        data: () => ({
            step: 5,
            latMin: 180,
            latMax: -180,
            lonMin: -180,
            lonMax: 180,
            points: [],
            routes: [],
            airport1: '',
            airport2: '',
            point: ''
        }),
        computed: {
            height() {
                return this.width
            },
            airports() {
                return rawAirports.filter(airport => {
                    return airport.hasOwnProperty('lat');
                })
            },
        },
        methods: {
            inspect(point) {
                this.point = point
            },
            getAirport(code) {
                var airport = this.airports.find(airport => airport.iata === code)
                return airport ? airport : {lat: 0, lng: 0}
            },
            randomAirports() {
                var index1 = Math.floor(Math.random() * this.airports.length)
                var index2 = Math.floor(Math.random() * this.airports.length)
                this.airport1 = this.airports[index1].iata
                this.airport2 = this.airports[index2].iata
            },
            arc(x1, y1, x2, y2) {
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
            getPoint: function(lat, lon) {
                var point = []
                countries.features.forEach(function(country) {
                    if (country.geometry.type === 'Polygon' &&
                        turf.inside(
                            turf.point([lon, lat]),
                            turf.polygon(country.geometry.coordinates)
                        )
                    ) { 
                        point.push(country.id)
                    }
                    if (country.geometry.type === 'MultiPolygon') {
                        country.geometry.coordinates.forEach(function(polygon) {
                            if (turf.inside(
                                turf.point([lon, lat]),
                                turf.polygon(polygon))
                            ) {
                                point.push(country.id)
                            }
                        })
                    }
                })
                return point
            }

        },
        mounted() {
            for (var lat = this.latMin; lat > this.latMax; lat -= this.step) {
                for (var lon = this.lonMin; lon < this.lonMax; lon += this.step) {
                    var point = this.getPoint(lat, lon)
                    if (point && point.length > 0) {
                        this.points.push({
                            lat, lon, countryId: point
                        })
                    }
                }
            }
            this.airport1 = 'TLL'
            this.airport2    = 'RGN'
        }
    }

</script>

<style>
</style>
