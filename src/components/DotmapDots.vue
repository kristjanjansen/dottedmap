<template>
    
        <g>
            <circle
                v-for="dot in dots"
                :cx="dot.lon"
                :cy="dot.lat"
                :r="radius"
                :fill="isActive(dot) ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'"
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
            activeCountry: '',
        }),
        computed: {
            radius() {
                return this.width / 350
            }
        },
        methods: {
            isActive(dot) {
                return dot.countries.indexOf(this.activeCountry) !== -1
            }
        },
        mounted() {
            this.$events.$on('dotmap.activeCountry', country => {
                this.activeCountry = country
            })
        }
    }

</script>