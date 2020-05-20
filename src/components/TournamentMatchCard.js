import React from 'react';
import MatchBar from './MatchInfoBar';
import _ from 'underscore';
import './TournamentMatchCard.css';

export default props => {
  const { matchType, matches } = props;
  return (
    <div id="match-card">
      <div id="match-logs">
        {matches.map((m, i) => {
          return <MatchBar key={i} matchData={m} />;
        })}
      </div>
      <div id="match-result"></div>
    </div>
  );
};
