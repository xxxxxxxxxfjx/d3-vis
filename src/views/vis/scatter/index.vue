<template>
    <div class="scatter" ref="mainRef">
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import * as d3 from "d3";
const mainRef = ref(null);

function draw() {
    const dataset = [
        [5, 20],
        [480, 90],
        [250, 50],
        [100, 33],
        [330, 95],
        [410, 12],
        [475, 44],
        [25, 67],
        [85, 21],
        [220, 88]
    ];
    const width = +mainRef.value.clientWidth;
    const height = +mainRef.value.clientHeight;
    console.log(width, height);

    const svg = d3.select('.scatter')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g');

    g.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', d => d[0])
        .attr('cy', d => d[1])
        .attr('r', d => Math.sqrt(+height - d[1]));

    g.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .attr('x',d=>d[0])
        .attr('y',d=>d[1])
        .attr('fill','red')
        .text(d=>`${d[0]},${d[1]}`)
}

onMounted(() => {
    draw()
})




</script>

<style lang='less' scoped>
.scatter {
    height: 100%;
    width: 100%;
}
</style>
