import React from 'react';

const ChevronsLeftIcon = ({
  style = {},
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
      className="feather feather-chevrons-left"
    >
      <polyline points="11 17 6 12 11 7"></polyline>
      <polyline points="18 17 13 12 18 7"></polyline>
    </svg>



  );

export default ChevronsLeftIcon;