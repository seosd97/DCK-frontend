import React from 'react';
import { Link } from 'react-router-dom';
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

  const isBlueWin = matchData.team1_score > matchData.team2_score;

  return (
    <Link
      to={`/matches/${matchData.id}`}
      className="match-element flex-col flex-j-c flex-align-c width-100"
    >
      <div className="match-type">{matchData.type}</div>

      <div className="match-result flex-row flex-j-c flex-align-c">
        <div className={'team' + (isBlueWin ? ' match-winner' : ' match-losser')}>{team1.name}</div>
        <div className="score flex-row flex-j-c">
          <div>{matchData.team1_score}</div>
          <div> - </div>
          <div>{matchData.team2_score}</div>
        </div>
        <div className={'team' + (isBlueWin ? ' match-losser' : ' match-winner')}>{team2.name}</div>
      </div>

      <div className="tournament-name">{matchData.tournamentName}</div>
    </Link>
  );
};
