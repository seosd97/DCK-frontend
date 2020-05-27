import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import './MatchInfoBar.css';

export default props => {
  const { matchData } = props;
  const blueTeam = matchData.teams.find(i => {
    return i.camp_id === 100;
  });
  const redTeam = matchData.teams.find(i => {
    return i.camp_id === 200;
  });

  return (
    <Link to={`/match/${matchData.id}`} id="match-info-bar-root">
      <span id="match-round">Round {matchData.round}</span>
      <div id="match-result-container">
        {!_.isUndefined(blueTeam) && (
          <div className={'team-wrapper' + (blueTeam.win ? ' winner' : '')}>
            <span className="team-name">{blueTeam.teamName}</span>
            <span className="match-result">{blueTeam.win ? 'W' : 'L'}</span>
          </div>
        )}
        <span className="match-colon">:</span>
        {!_.isUndefined(redTeam) && (
          <div className={'team-wrapper' + (redTeam.win ? ' winner' : '')}>
            <span className="match-result">{redTeam.win ? 'W' : 'L'}</span>
            <span className="team-name">{redTeam.teamName}</span>
          </div>
        )}
      </div>
    </Link>
  );
};
