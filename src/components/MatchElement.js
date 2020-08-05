import React from 'react';
import _ from 'underscore';
import './MatchElement.css';

export default props => {
  const { matchData } = props;
  const team1 = matchData.teams.find(t => {
    return t.id === matchData.team1_id;
  });
  const team2 = matchData.teams.find(t => {
    return t.id === matchData.team2_id;
  });

  return (
    <div className="flex-col flex-j-c flex-align-c">
      <div className="match-elem-type">{matchData.type}</div>
      <div className="flex-row flex-align-c">
        <div>{team1.name}</div>
        <div>{matchData.team1_score}</div>
        <div> : </div>
        <div>{matchData.team2_score}</div>
        <div>{team2.name}</div>
      </div>
    </div>
  );
};
