import React from 'react';
import numeral from 'numeral';
import './Progress.css';

const Progress = props => {
  const { val, max, camp } = props;
  const maxValue = Math.ceil(max * 0.001) * 1000;
  const fillValue = Math.round((val / maxValue) * 100);
  const campClass = camp === 100 ? 'fill-blue' : 'fill-red';

  const fillStyle = {
    backgroundColor: camp === 100 ? 'var(--team-color-blue)' : 'var(--team-color-red)',
    width: `${fillValue}%`,
    height: '100%',
    float: props.reverse ? 'right' : 'left'
  };

  return (
    <div className="progress">
      <div className="progress-fill" style={fillStyle}></div>
    </div>
  );
};

Progress.defaultProps = {
  val: 0,
  max: 0,
  camp: 100,
  reverse: false
};

export default Progress;
