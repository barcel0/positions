import React from 'react';

const ArrowUpCircleIcon = ({
  style = {  },
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 32 32"
}) => (


<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="2" 
  strokeLinecap="round" 
  strokeLinejoin="round" 
  className="feather feather-arrow-up-circle"
>
  <circle cx="12" cy="12" r="10"></circle>
  <polyline points="16 12 12 8 8 12"></polyline>
  <line x1="12" y1="16" x2="12" y2="8"></line>
</svg>

);

export default ArrowUpCircleIcon;