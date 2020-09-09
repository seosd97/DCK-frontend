import React from 'react';

const Progress = ({ val, fillColor, backgroundColor, align, width, height, round }) => {
  const backgroundStyle = {
    width: width,
    height: height,
    borderRadius: round,
    backgroundColor: backgroundColor
  };

  const fillStyle = {
    backgroundColor: fillColor,
    width: `${val}%`,
    height: '100%',
    float: align,
    borderRadius: round,
    transition: 'width .2s ease'
  };

  return (
    <div className="cui-progress" style={backgroundStyle}>
      <div className="cui-progress-fill" style={fillStyle}></div>
    </div>
  );
};

Progress.defaultProps = {
  val: 0,
  fillColor: 'var(--team-color-blue)',
  backgroundColor: 'var(--white)',
  align: 'left',
  width: '100%',
  height: '10px',
  round: '0px',
  reverse: false
};

export default Progress;
