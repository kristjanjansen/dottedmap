<template>
    
        <g>
            <circle
                v-for="dot in dots"
                :cx="dot.lon"
                :cy="dot.lat"
                :r="radius"
                :fill="isActive ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'"
            />
        </g>

</template>

<script>

    export default {
        props: {
            width: { default: 0 },
            height: { default: 0 },
            dots: { default: [] }
        },
        data: () => ({ isActive: false })
        computed: {
            radius() {
                return this.width / 350
            }
        }
    }

</script>