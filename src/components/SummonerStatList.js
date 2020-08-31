import React from 'react';
import _ from 'underscore';
import SummonerStatElem from './SummonerStatElem';
import './SummonerStatList.css';

const calcTopDealt = participants => {
  if (_.isEmpty(participants)) {
    return 0;
  }

  let topDealt = 0;
  participants.forEach(s => {
    topDealt = Math.max(topDealt, s.stat.totalDamageDealt);
  });

  return topDealt;
};

export default props => {
  const { matchData, teamId } = props;

  const teamStat = matchData.teamStats.find(t => {
    return t.camp_id === teamId;
  });
  const participants = matchData.participants.filter(p => {
    return p.team_id === teamId;
  });

  return (
    <section
      className={
        'summoner-stat-root flex-col flex-align-c width-100' + (teamStat.win ? ' winner' : '')
      }
    >
      <div className="stat-header flex-row flex-align-c width-100">
        <div className="table-header stat-result">
          <span>{teamStat.win ? '승리' : '패배'}</span>
          {teamStat.camp_id === 100 ? 'BLUE TEAM' : 'RED TEAM'}
        </div>
        <div className="table-header stat-kda">KDA</div>
        <div className="table-header stat-dealt">피해량</div>
        <div className="table-header stat-sight">시야</div>
        <div className="table-header stat-cs">CS</div>
        <div className="table-header stat-item">아이템</div>
      </div>
      <div className="stat-body flex-col width-100">
        {participants.map((p, i) => {
          return (
            <SummonerStatElem
              key={i}
              summonerStat={p.stat}
              summonerData={matchData.summoners.find(s => {
                return p.participant_id === s.uuid;
              })}
              topDealt={calcTopDealt(matchData.participants)}
              gameTime={matchData.duration}
            />
          );
        })}
      </div>
    </section>
  );
};
