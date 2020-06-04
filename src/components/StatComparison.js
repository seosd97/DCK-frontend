import React from 'react';
import './StatComparison.css';

export default props => {
  return (
    <div className="flex-row flex flex-align-c width-100">
      <div className="sc-val text-align-right width-100 tc-blue">{props.lVal}</div>
      <div className="sc-val text-align-center width-100 tc-normal">{props.stat}</div>
      <div className="sc-val text-align-left width-100 tc-red">{props.rVal}</div>
    </div>
  );
};
