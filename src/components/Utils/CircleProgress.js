import React from 'react';

const pie = 3.141592;

const CircleProgress = ({
  width,
  height,
  radius,
  lineWidth,
  backgroundColor,
  fillColor,
  value,
  label,
  labelColor,
  fontSize,
  fontWeight
}) => {
  const strokeArray = 2 * pie * radius;
  return (
    <svg className="cui-circle-progress" width={width} height={height}>
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
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={labelColor}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {label}
      </text>
    </svg>
  );
};

CircleProgress.defaultProps = {
  width: '100',
  height: '100',
  radius: '40',
  lineWidth: '10px',
  backgroundColor: 'transparent',
  fillColor: 'var(--blue)',
  value: 0,
  label: '',
  labelColor: 'var(--white)',
  fontSize: '1em',
  fontWeight: '100'
};

export default CircleProgress;
