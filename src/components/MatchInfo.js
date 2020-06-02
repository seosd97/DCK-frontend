import React from 'react';
import { Link } from 'react-router-dom';
import UnixTime from './Utils/UnixTime';
import SummonerInfo from './MatchSummonerElement';
import TeamElement from './MatchTeamElement';
import './MatchInfo.css';
import MatchTeamElement from './MatchTeamElement';

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
      <MatchTeamElement teams={props.matchData.teams} />
      {/* {props.matchData.teams[0].summoners.map((d, i) => {
        return <SummonerInfo key={i} data={d} />;
      })}
      {props.matchData.teams[1].summoners.map((d, i) => {
        return <SummonerInfo key={i} data={d} />;
      })} */}
    </div>
  );
};
