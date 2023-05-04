<template>
    <svg ref=svgRef width="900" height="500"></svg>
</template>

<script setup>
import * as d3 from 'd3'
import { onMounted, ref } from 'vue';
const svgRef = ref(null);

function draw() {
    const svg = d3.select(svgRef.value);
    const margin = {
        top: 40,
        left: 50,
        right: 10,
        bottom: 130,
    };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const main = svg
        .append('g')
        .attr('class', 'main')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const miniMargin = {
        top: 400,
        left: margin.left,
        right: margin.right,
        bottom: 20,
    };
    const miniWidth = +svg.attr('width') - miniMargin.left - miniMargin.right;
    const miniHeight = +svg.attr('height') - miniMargin.top - miniMargin.bottom;
    const miniArea = svg
        .append('g')
        .attr('clas', 'miniArea')
        .attr('transform', `translate(${miniMargin.left},${miniMargin.top})`);

    const clip = svg
        .append('defs')
        .append('svg:clipPath')
        .attr('id', 'clip')
        .append('svg:rect')
        .attr('width', width)
        .attr('height', height)
        .attr('x', 0)
        .attr('y', 0);


    async function getData() {
        return await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv', d => ({
            date: d3.timeParse('%Y-%m-%d')(d.date),
            value: +d.value,
        })).then(data => {
            return Promise.resolve(data)
        });
    }
    function chart(data) {
        const x = d3
            .scaleUtc()
            .domain(d3.extent(data, d => d.date))
            .range([0, width]);
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0]);

        // miniArea附图的比例尺
        const x1 = d3.scaleUtc().domain(x.domain()).range([0, miniWidth]);
        const y1 = d3.scaleLinear().domain(y.domain()).range([miniHeight, 0]);

        // main主图的轴
        const xAxis = main
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0,${height})`)
            .call(
                d3
                    .axisBottom(x)
                    .ticks(width / 80)
                    .tickSizeOuter(0)
            );
        const yAxis = main
            .append('g')
            .attr('class', 'yAxis')
            .call(d3.axisLeft(y).tickSizeOuter(0));

        yAxis.select('.domain').remove();
        yAxis
            .selectAll('.tick')
            .append('line')
            .attr('x0', 0)
            .attr('x1', width)
            .attr('stroke', '#ccc');

        // miniArea附图的轴
        const mxAxis = miniArea
            .append('g')
            .attr('class', 'mxAxis')
            .attr('transform', `translate(0,${miniHeight})`)
            .call(
                d3
                    .axisBottom(x1)
                    .ticks(miniWidth / 80)
                    .tickSizeOuter(0)
            );
        const mainArea = main.append('g').attr('clip-path', 'url(#clip)');

        // 面积生成器
        const area = d3
            .area()
            .defined(d => !isNaN(d.value))
            .x(d => x(d.date))
            .y0(y(0))
            .y1(d => y(d.value));

        const area1 = d3
            .area()
            .defined(d => !isNaN(d.value))
            .x(d => x1(d.date))
            .y0(y1(0))
            .y1(d => y1(d.value));

        // main主图的面积
        mainArea
            .append('path')
            .attr('class', 'main-path')
            .datum(data)
            .attr('d', d => area(d))
            .attr('fill', 'steelblue');

        // miniArea附图的面积图
        miniArea
            .append('path')
            .attr('class', 'mini-path')
            .datum(data)
            .attr('d', d => area1(d))
            .attr('fill', 'steelblue');

        // 设置brush
        const brush = d3
            .brushX()
            .extent([
                [0, 1],
                [miniWidth, miniHeight + 1],
            ])
            .on('brush', brushing)
            .on('end', brushEnd);

        // 设置brush的默认位置
        const defaultSelection = [x1(d3.utcYear.offset(x1.domain()[1], -1)), x1.range()[1]];

        // 绑定brush到元素上并设置默认位置 实际像素位置
        miniArea
            .append('g')
            .attr('class', 'brush')
            .call(brush)
            .call(brush.move, defaultSelection);

        // 标题
        svg.append('g')
            .attr('class', 'text')
            .append('text')
            .attr('y', 20)
            .style('font-size', 10)
            .text('↑ Close $');

        const bisetc = d3.bisector(d => {
            console.log(d);
        }).left;

        const focus = main
            .append('g')
            .attr('class', 'interaction-circle')
            .append('circle')
            .style('fill', 'none')
            .attr('stroke', 'black')
            .attr('r', 8.5)
            .style('opacity', 0);

        // Create the text that travels along the curve of chart
        const focusText = main
            .append('g')
            .attr('class', 'interaction-text')
            .append('text')
            .style('opacity', 0)
            .attr('text-anchor', 'left')
            .attr('alignment-baseline', 'middle');

        // 光标
        main.append('g')
            .attr('class', 'interaction')
            .append('rect')
            .attr('fill', 'none')
            .attr('pointer-event', 'all')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseout', mouseout);

        function brushing({ selection }) {
            const [xP, yP] = selection;
            x.domain([x1.invert(xP), x1.invert(yP)]);
            d3.select('.xAxis').call(d3.axisBottom(x).tickSizeOuter(0));
            d3.select('.main-path').attr('d', d => area(d));
        }

        function brushEnd({ selection }) {
            if (!selection) {
                d3.select('.brush').call(brush.move, defaultSelection);
            }
        }

        function mouseover() {
            focus.style('opacity', 1);
            focusText.style('opacity', 1);
        }
        function mousemove(event) {
            console.log(event);
            console.log(d3.pointer(event));
        }
        function mouseout() { }
    }
    getData().then(data => {
        chart(data)
    })
}

onMounted(() => {
    draw()
})

</script>

<style lang='less' scoped></style>
