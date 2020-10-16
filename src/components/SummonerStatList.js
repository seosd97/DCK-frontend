import React from 'react';
import _ from 'underscore';
import SummonerStatElem from './SummonerStatElem';
import './SummonerStatList.css';

const calcTopDealt = stats => {
  if (_.isEmpty(stats)) {
    return 0;
  }

  let topDealt = 0;
  stats.forEach(s => {
    topDealt = Math.max(topDealt, s.totalDamageDealt);
  });

  return topDealt;
};

export default props => {
  const { matchData, teamId } = props;

  const teamStat = matchData.teamStats.find(t => {
    return t.camp_id === teamId;
  });
  const participants = matchData.participants.filter(p => {
    return p.camp_id === teamId;
  });

  return (
    <div
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
              summonerStat={matchData.stats.find(s => s.summoner_uuid === p.uuid)}
              summonerData={p}
              topDealt={calcTopDealt(matchData.stats)}
              gameTime={matchData.duration}
            />
          );
        })}
      </div>
    </div>
  );
};
