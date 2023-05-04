<template>
    <div class="home">
        <svg ref=svgRef width="900" height="500"></svg>
    </div>
</template>

<script setup>
import * as d3 from 'd3'
import { onMounted, ref } from 'vue';
const svgRef = ref(null);

function draw() {
    const mainSvg = d3.select(svgRef.value);
    const margin = {
        top: 20,
        right: 10,
        bottom: 20,
        left: 50,
    };
    const width = +mainSvg.attr('width') - margin.left - margin.right;
    const height = +mainSvg.attr('height') - margin.top - margin.bottom;


    const svg = mainSvg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // d3.timeParse("%Y-%m-%d")会将满足里面格式的时间数据转换成new Date的格式
    async function getData() {
        return await d3.csv(
            'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv',
            d => ({ date: d3.timeParse('%Y-%m-%d')(d.date), value: +d.value })
        ).then(data => {
            return Promise.resolve(data)
        })
    }


    function render(data) {
        const x = d3
            .scaleUtc()
            .domain(d3.extent(data, d => d.date))
            .range([0, width]);

        const xAxis = svg
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0]);

        const yAxis = svg.append('g').attr('class', 'yAxis').call(d3.axisLeft(y));

        const area = d3
            .area()
            .defined(d => !isNaN(d.value)) //看文档即懂
            .x(d => d.date)
            .y0(y(0))
            .y1(d => y(d.value));

        svg.append('g')
            .attr('class', 'area')
            .append('path')
            .datum(data)
            .attr(
                'd',
                d3
                    .area()
                    .x(d => x(d.date))
                    .y0(y(0))
                    .y1(d => y(d.value))
            )
            .attr('fill', '#cce5df')
            .attr('stroke', '#69b3a2')
            .attr('stroke-width', 1.5);
    }
    getData().then(data => {
        render(data)
    })
}
onMounted(() => {
    draw()
})
</script>

<style lang='less' scoped>
svg{
    border: 1px solid #ccc;
    margin-top: 2px;
}
</style>
