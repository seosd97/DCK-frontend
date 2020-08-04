import React from 'react';
import _ from 'underscore';
import './MatchElement.css';

export default props => {
  const { matchData } = props;

  return (
    <div className="flex-row flex-j-c flex-align-c">
      <span className="">{matchData.type}</span>
    </div>
  );
};
