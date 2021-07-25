import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import { select, line, curveCardinal } from 'd3'




function App() {

  const [data, setData] = useState([10, 20, 25, 30, 60 , 50]);

  const svgRef = useRef();

  useEffect(() => {

    const svg = select(svgRef.current);
    const myLine = line()
        .x((value, index) => index * 50)
        .y(value => 150 - value)
        .curve(curveCardinal);
        svg.selectAll('path')
        .data([data])
        .join('path')
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
    <svg ref={ svgRef }>
      <path d='' stroke='red' fill='none' />
    </svg>
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
