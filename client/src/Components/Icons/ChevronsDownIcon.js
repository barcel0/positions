import React from 'react';

const ChevronsDownIcon = ({
  style = {  },
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 32 32"
}) => (

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="18" 
  height="18" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="2" 
  strokeLinecap="round" 
  strokeLinejoin="round" 
  className="feather feather-chevrons-down"
>
  <polyline points="7 13 12 18 17 13"></polyline>
  <polyline points="7 6 12 11 17 6"></polyline>
</svg>



);

export default ChevronsDownIcon;