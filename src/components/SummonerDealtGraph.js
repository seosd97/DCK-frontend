import React from 'react';
import ChampionIcon from './Icons/ChampionIcon';
import Progress from './Utils/Progress';
import numeral from 'numeral';

export default props => {
  const flexClass = props.summonerData.camp_id === 100 ? 'flex-row' : 'flex-row-r';

  return (
    <div className={`${flexClass} width-100 flex-align-c`}>
      <ChampionIcon cid={props.summonerData.cid} small />
      <span>{numeral(props.summonerData.totalDamageDealt).format('0.0a')}</span>
      <Progress
        val={props.summonerData.totalDamageDealt}
        max={props.topDealt}
        camp={props.summonerData.camp_id}
        reverse={props.reverse}
      />
    </div>
  );
};
