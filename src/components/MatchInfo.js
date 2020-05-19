import React from 'react';
import './MatchInfo.css';

export default props => {
  const { matchData } = props;
  return (
    <div>
      <span>{matchData.gameId}</span>
      <span>{matchData.platformId}</span>
    </div>
  );
};
