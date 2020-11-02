import React from 'react';

const FileIcon = ({
  style = {  },
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 32 32"
}) => (

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width={width}
  height={width} 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="2" 
  strokeLinecap="round" 
  strokeLinejoin="round" 
  className="feather feather-file"
>
  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
  <polyline points="13 2 13 9 20 9"></polyline>
</svg>

);

export default FileIcon;