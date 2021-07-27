import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import { select, line, curveCardinal, scaleLinear, axisBottom, axisRight } from 'd3'




function App() {

  const [data, setData] = useState([10, 50, 25, 30, 60 , 50]);
  const svgRef = useRef();
 



  useEffect(() => {

    const svg = select(svgRef.current);

    //Axes

    const xScale = scaleLinear()
        .domain([0, data.length - 1])
        .range([0, 300]);

    const yScale = scaleLinear()
        .domain([0, 150])
        .range([150, 0]);

    
    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1);
      svg
        .select('.x-Axis')
        .call(xAxis)
        .style('transform', 'translateY(150px)');

    const yAxis = axisRight(yScale);
      svg
      .select('.y-Axis')
      .call(yAxis)
      .style('transform', 'translateX(300px)');

    //Chart
      
    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

      svg.selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', value => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'blue');

    // svg.selectAll('circle')
    //     .data(data)
    //     .join('circle')
    //     .attr('r', value => value)
    //     .attr('cx', value => value * 2)
    //     .attr('cy', value => value * 2)
    //     .attr('stroke', 'red');

    console.clear()
    
  }, [data])
  return (
    <React.Fragment>
    <h1>Line</h1>
        <svg ref={ svgRef }>
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
        
    </React.Fragment>
  );
}


export default App;
