<template>
    
        <g>
            <circle
                v-for="dot in dots"
                :cx="dot.lon"
                :cy="dot.lat"
                :r="radius"
                :fill="isActive(dot) ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'"
            />
        </g>

</template>

<script>

    export default {
        props: {
            dots: { default: [] },
            width: { default: 0 }
        },
        data: () => ({
            activeCountries: [],
        }),
        computed: {
            radius() {
                return this.width / 350
            }
        },
        methods: {
            isActive(dot) {
                return dot.countries.find(country => {
                    return this
                        .activeCountries
                        .find(activeCountry => activeCountry === country)
                })
            }
        },
        mounted() {
            this.$events.$on('dotmap.activeCountry', country => {
                this.activeCountries.push(country)
            })
        }
    }

</script>