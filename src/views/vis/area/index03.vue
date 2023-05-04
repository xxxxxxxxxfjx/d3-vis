<template>
    <div class="home" ref=svgRef style="width:1000px;height: 1000px;border: 1px solid #ccc;">
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
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;



    // d3.timeParse("%Y-%m-%d")会将满足里面格式的时间数据转换成new Date的格式
    async function getData() {
        return await d3.csv(
            'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv',
        ).then(data => {
            return Promise.resolve(data)
        })
    }


    function render(data) {
        console.log(data);
        const sort = d3
            .group(data, d => d.name)
        console.log(sort);

        const names = Array.from(new Set(data.map(d=>d.name)));
console.log(names);
        const svg = mainSvg
            .selectAll('.chart')
            .data(sort)
            .enter()
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3
            .scaleLinear()
            .domain(
                d3.extent(data, function (d) {
                    return d.year;
                })
            )
            .range([0, width]);

        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x).ticks(3))
            .selectAll('.domain,.tick line')
            .attr('stroke-width', 2);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => +d.n)])
            .range([height, 0]);

        svg.append('g')
            .call(d3.axisLeft(y).ticks(5))
            .selectAll('.domain,.tick line')
            .attr('stroke-width', 2);

        const color = d3
            .scaleOrdinal()
            .domain(names)
            .range([
                '#e41a1c',
                '#377eb8',
                '#4daf4a',
                '#984ea3',
                '#ff7f00',
                '#ffff33',
                '#a65628',
                '#f781bf',
                '#999999',
            ]);

        const area = d3
            .area()
            .x(d => x(d.year))
            .y0(y(0))
            .y1(d => y(+d.n));

        svg.append('path')
            .attr('fill', d => color(d[0]))
            .datum(d => d[1])
            .attr('d', d => area(d));

        svg.append('text')
            .text(d => d[0])
            .attr('x', 0)
            .style('font-size', '20px')
            .style('font-weight', '800')
            .attr('fill', d => color(d[0]));
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
.home{
    overflow-y: auto;
}
</style>
