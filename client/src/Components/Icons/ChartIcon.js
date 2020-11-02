import React from 'react';

const ChartIcon = ({
  style = {  },
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 32 32"
}) => (


<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="30" 
  height="30" 
  viewBox="0 0 100 100"
>
  <g transform="translate(0,-952.36218)">
    <path 
      d="m 75,976.3622 0,52 10,0 0,-52 -10,0 z m -40,8 0,44 10,0 0,-44 -10,0 z m 20,8 0,36 10,0 0,-36 -10,0 z m -40,8 0,28 10,0 0,-28 -10,0 z" 
      fill="white" 
      stroke="white" 
      strokeWidth="2" 
      // stroke-linecap="square" 
      // stroke-linejoin="square" 
      className="chart"
    />
  </g>
</svg>

);

export default ChartIcon;