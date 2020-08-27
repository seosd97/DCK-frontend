import React from 'react';
import './SummonerStatList.css';
import { isImageUrl } from 'antd/lib/upload/utils';
import SummonerStatElem from './SummonerStatElem';

export default props => {
  const { teamStat, participants } = props;
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
        {participants.map((s, i) => {
          return <SummonerStatElem key={i} summonerStat={s.stat} summonerData={s.summoner} />;
        })}
      </div>
    </section>
  );
};
