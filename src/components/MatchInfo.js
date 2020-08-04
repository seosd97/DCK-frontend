import React from 'react';
import { Link } from 'react-router-dom';
import UnixTime from './Utils/UnixTime';
import MatchTeamElement from './MatchTeamElement';
import SummonerInfo from './MatchSummonerElement';
import DealtGraph from './MatchDealtGraph';
import SummonerDealtGraph from './SummonerDealtGraph';
import './MatchInfo.css';
import ChampionIcon from './Icons/ChampionIcon';

export default props => {
  return (
    <div id="match-info-root">
      <div id="match-info-content">
        <div className="flex-col">
          {props.matchData.summoners.map((d, i) => {
            return (
              props.matchData.teams[0].camp_id === d.camp_id && (
                <SummonerInfo
                  key={i}
                  summonerData={d}
                  duration={props.matchData.duration}
                  reverse
                />
              )
            );
          })}

          <div className="bans-container">
            <div className="flex-row flex-align-c">
              <div className="ban-text">Bans : </div>
              {props.matchData.teams[0].bans.map((d, i) => {
                return <ChampionIcon key={i} cid={d.cid} class="banned-champ-icon" small />;
              })}
            </div>
          </div>
        </div>

        <div className="flex-col width-100 team-result">
          <div className="match-duration">
            GAMETIME <UnixTime unix format="mm : ss" duration={props.matchData.duration} />
          </div>
          <MatchTeamElement teams={props.matchData.teams} />
        </div>

        <div className="flex-col">
          {props.matchData.summoners.map((d, i) => {
            return (
              props.matchData.teams[1].camp_id === d.camp_id && (
                <SummonerInfo key={i} summonerData={d} duration={props.matchData.duration} />
              )
            );
          })}

          <div className="bans-container">
            <div className="flex-row flex-align-c flex-j-e">
              <div className="ban-text">Bans : </div>
              {props.matchData.teams[1].bans.map((d, i) => {
                return <ChampionIcon key={i} cid={d.cid} class="banned-champ-icon" small />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
