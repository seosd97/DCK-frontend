import React from 'react';

const Progress = props => {
  const { val, max } = props;
  const maxValue = Math.ceil(max * 0.001) * 1000;
  const fillValue = Math.round((val / maxValue) * 100);

  const backgroundStyle = {
    width: '100%',
    height: props.height
  };

  const fillStyle = {
    backgroundColor: props.fillColor,
    width: `${fillValue}%`,
    height: '100%',
    float: props.align
  };

  return (
    <div style={backgroundStyle}>
      <div style={fillStyle}></div>
    </div>
  );
};

Progress.defaultProps = {
  val: 0,
  max: 0,
  fillColor: 'var(--team-color-blue)',
  align: 'left',
  height: '10px'
};

export default Progress;
