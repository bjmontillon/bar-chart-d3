import React,{ useEffect, useRef, useState } from 'react';
import './BarChart.css';
import { select, scaleLinear, axisBottom, axisRight, scaleBand } from 'd3';

function Barchart() {;
    const [data, setData] = useState([10, 20, 25, 30, 60 , 50, 80])
    const svgRef = useRef();

    useEffect(() => {

        const svg = select(svgRef.current)
        
        //Axes 
        const xScale = scaleBand()
                .domain(data.map((value, index) => index))
                .range([0, 300])
                .padding(0.4);


        const xAxis = axisBottom(xScale).ticks(data.length)
            svg
                .select('.x-Axis')
                .call(xAxis)
                .style('transform', 'translateY(150px)');

        const yScale = scaleLinear()
                .domain([0, 150])
                .range([150, 0]);

                const colorScale = scaleLinear()
                .domain([75, 100, 150])
                .range(['black', 'orange', 'yellow'])
                .clamp(true);
            
        const yAxis = axisRight(yScale)
            svg 
                .select('.y-Axis')
                .call(yAxis)
                .style('transform', 'translateX(300px)');

            svg 
                .selectAll('.bar')
                .data(data)
                .join('rect')
                .attr('class', 'bar')
                .style('transform', 'scale(1, -1)')
                .attr('x', (value, index) => xScale(index))
                .attr('y', -150)
                .attr('width', xScale.bandwidth(xScale))
                .on("mouseenter", (event, value) => {
                    // events have changed in d3 v6:
                    // https://observablehq.com/@d3/d3v6-migration-guide#events
                    const index = svg.selectAll(".bar").nodes().indexOf(event.target);
                    svg
                      .selectAll(".tooltip")
                      .data([value])
                      .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
                      .attr("class", "tooltip")
                      .text(value)
                      .attr("x", xScale(index) + xScale.bandwidth() / 2)
                      .attr("text-anchor", "middle")
                      .transition()
                      .attr("y", yScale(value) - 8)
                      .attr("opacity", 1);
                  })
                  .on("mouseleave", () => svg.select(".tooltip").remove())
                .transition()
                .attr('fill', colorScale)
                .attr('height', value => 150 - yScale(value));

    }, [data]);

    return (
        <React.Fragment>
        <h1>Barchart</h1>
            <svg ref= { svgRef}>
                <g className='x-Axis' />
                <g className='y-Axis' />
            </svg>

            <br />
            <br />
            <button onClick={() => setData(data.map(value => value + 5))}>
            Update data
            </button>
            <button onClick={() => setData(data.filter(value => value < 35))}>
            Filter data
            </button>
            <button onClick={() => setData([...data, Math.round(Math.random() * 100)])}>
            Add data
      </button>
        </React.Fragment>
    )
}

export default Barchart