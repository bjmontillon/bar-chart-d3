import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import { select } from 'd3'




function App() {

  const [data, setData] = useState([10, 20, 25, 30, 60 , 50]);

  const svgRef = useRef();

  useEffect(() => {

    const svg = select(svgRef.current);

    svg.selectAll('circle')
        .data(data)
        .join('circle')
        .attr('r', value => value)
        .attr('cx', value => value * 2)
        .attr('cy', value => value * 2)
        .attr('stroke', 'red');

    console.clear()
    
  }, [data])
  return (
    <React.Fragment>
    <svg ref={ svgRef }></svg>
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
