import React from 'react';
import numeral from 'numeral';
import ChampionIcon from './Icons/ChampionIcon';
import Progress from './Utils/Progress';

export default ({ data, topValue, reverse }) => {
  return (
    <div className={`stat-graph-elem ${reverse ? 'flex-row-r' : 'flex-row'} flex-align-c`}>
      <ChampionIcon cid={data.cid} />
      <div
        className={`stat-progress ${reverse ? 'flex-row-r' : 'flex-row'} flex-align-c width-100`}
      >
        <div className="stat-desc">{numeral(data.value).format('0.0a')}</div>
        <Progress
          val={(data.value / topValue) * 100}
          fillColor={data.team_id === 100 ? 'var(--blue)' : 'var(--red)'}
          backgroundColor="transparent"
          width="100%"
          height="10px"
          round="5px"
          align={reverse ? 'right' : 'left'}
        />
      </div>
    </div>
  );
};
