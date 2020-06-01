import React from 'react';
import { Link } from 'react-router-dom';
import MatchBar from './MatchInfoBar';
import _ from 'underscore';
import './TournamentMatchCard.css';

export default props => {
  const { matchType, matches } = props;
  return (
    <div id="match-list">
      <span></span>
      {matches.map((m, i) => {
        return (
          <Link key={i} to={`/match/${m.gid}`} className="match-item">
            <MatchBar matchData={m} />
          </Link>
        );
      })}
    </div>
  );
};
