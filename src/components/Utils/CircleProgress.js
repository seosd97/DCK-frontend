import React from 'react';

const pie = 3.141592;

export default ({
  width,
  height,
  radius,
  lineWidth,
  backgroundColor,
  fillColor,
  value,
  fontSize,
  label
}) => {
  const strokeArray = 2 * pie * radius;
  return (
    <svg width={width} height={height}>
      <g style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={lineWidth}
          fill="transparent"
        ></circle>
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={fillColor}
          strokeWidth={lineWidth}
          strokeDasharray={strokeArray}
          strokeDashoffset={strokeArray * ((100 - value) / 100)}
          fill="transparent"
        ></circle>
      </g>
      <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" fontSize={fontSize}>
        {label}
      </text>
    </svg>
  );
};
