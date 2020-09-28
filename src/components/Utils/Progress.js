import React from 'react';

const Progress = ({ val, fillColor, backgroundColor, align, width, height, round, animate }) => {
  const backgroundStyle = {
    width: width,
    height: height,
    borderRadius: round,
    backgroundColor: backgroundColor
  };

  const fill = {
    keyframe: {
      from: {
        width: '0'
      },
      to: {
        width: '100%'
      }
    }
  };

  const fillStyle = {
    style: {
      backgroundColor: fillColor,
      width: `${val}%`,
      height: '100%',
      float: align,
      borderRadius: round,
      transition: 'width .2s ease'
    }
  };

  return (
    <div className="cui-progress" style={backgroundStyle}>
      <div
        className={'cui-progress-fill' + (animate ? ' animate' : '')}
        style={fillStyle.style}
      ></div>
    </div>
  );
};

Progress.defaultProps = {
  val: 0,
  fillColor: 'var(--blue)',
  backgroundColor: 'var(--black)',
  align: 'left',
  width: '100%',
  height: '10px',
  round: '0px',
  reverse: false,
  animate: false
};

export default Progress;
