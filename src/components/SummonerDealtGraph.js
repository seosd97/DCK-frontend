import React from 'react';
import ChampionIcon from './Icons/ChampionIcon';
import Progress from './Utils/Progress';
import numeral from 'numeral';

export default props => {
  const isBlue = props.summonerData.camp_id === 100;
  const fillColor = isBlue ? 'var(--team-color-blue)' : 'var(--team-color-red)';
  const flexClass = props.reverse ? 'flex-row-r' : 'flex-row';

  return (
    <div className={`${flexClass} width-100 flex-align-c ${props.class}`}>
      <ChampionIcon cid={props.summonerData.cid} small />
      <span className="m-v-10 fs-1-2r">
        {numeral(props.summonerData.totalDamageDealt).format('0.0a')}
      </span>
      <Progress
        val={props.summonerData.totalDamageDealt}
        max={props.topDealt}
        fillColor={fillColor}
        align={isBlue ? 'left' : 'right'}
      />
    </div>
  );
};
