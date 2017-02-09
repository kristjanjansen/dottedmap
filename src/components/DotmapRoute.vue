<template>
    
    <g v-if="sourcex !== 0 && targetx !== 0">
            
        <path
            :d="arc(sourcex, sourcey, targetx, targety)"
            stroke="white"
            fill="none"
            stroke-width="2"
        />

        <circle
            :cx="sourcex"
            :cy="sourcey"
            :r="radius"
            fill="white"
        />

        <circle
            :cx="targetx"
            :cy="targety"
            :r="radius"
            fill="white"
        />

    </g>

</template>

<script>

    export default {
        props: {
            sourcex: { default: '' },
            sourcey: { default: '' },
            targetx: { default: '' },
            targety: { default: '' },
            radius: { default: 5 },
        },
        methods: {
            arc(x1, y1, x2, y2) {
                
                // From http://bl.ocks.org/mbostock/1153292
                // By default the arc is angled counter-clockwise
                // When we draw westbound arcs, lets flip 
                // the source and target

                if (x1 >= x2) {
                    var tmpx2 = x2; x2 = x1; x1 = tmpx2
                    var tmpy2 = y2; y2 = y1; y1 = tmpy2
                } 
                var dx = x2 - x1
                var dy = y2 - y1
                var dr = Math.sqrt(dx * dx + dy * dy)
                
                return "M" + x1 + "," + y1 + "A" + dr + "," + dr +
                " 0 0,1 " + x2 + "," + y2
            }
        }
    }

</script>

<style>
</style>
