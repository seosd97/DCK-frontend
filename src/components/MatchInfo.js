import React from 'react';
import { Link } from 'react-router-dom';
import UnixTime from './Utils/UnixTime';
import MatchTeamElement from './MatchTeamElement';
import SummonerInfo from './MatchSummonerElement';
import './MatchInfo.css';

export default props => {
  return (
    <div id="match-info-root">
      <div id="match-info-duration">
        GAMETIME{' '}
        <UnixTime
          unix
          format="mm : ss"
          duration={props.matchData.duration}
          className="duration-time"
        />
      </div>

      <div id="match-info-content">
        <div className="flex-column width-100">
          {props.matchData.teams[0].summoners.map((d, i) => {
            return <SummonerInfo key={i} summonerData={d} reverse />;
          })}
        </div>

        <MatchTeamElement teams={props.matchData.teams} />

        <div className="flex-column width-100">
          {props.matchData.teams[1].summoners.map((d, i) => {
            return <SummonerInfo key={i} summonerData={d} />;
          })}
        </div>
      </div>
    </div>
  );
};
