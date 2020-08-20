import React from 'react';
import './Scoreboard.css';

export default ({
  team1 = '-',
  team1_score = 0,
  team2 = '-',
  team2_score = 0,
  fontSize = '1em'
}) => {
  return (
    <div
      className="cui-scoreboard-root flex-row flex-j-c flex-align-c"
      style={{ fontSize: fontSize }}
    >
      <div className="team-name">{team1}</div>
      <div className="scoreboard flex-row flex-align-c">
        <div className="team-score">{team1_score}</div>
        <div className="team-score">{team2_score}</div>
      </div>
      <div className="team-name">{team2}</div>
    </div>
  );
};
