import React from 'react';
import './StatComparison.css';

export default props => {
  return (
    <div id="stat-comparison">
      <div className="sc-val text-align-right tc-blue">{props.lVal}</div>
      <div className="sc-val text-align-center">{props.stat}</div>
      <div className="sc-val text-align-left tc-red">{props.rVal}</div>
    </div>
  );
};
