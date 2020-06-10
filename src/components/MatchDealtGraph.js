import React from 'react';
import SummonerDealtGraph from './SummonerDealtGraph';
import './MatchDealtGraph.css';

export default props => {
  return (
    <div className="flex-col width-100">
      {props.summoners.map((d, i) => {
        return (
          <SummonerDealtGraph
            key={i}
            summonerData={d}
            topDealt={props.topDealt}
            camp={d.camp_id}
            reverse={props.reverse}
          />
        );
      })}
    </div>
  );
};
