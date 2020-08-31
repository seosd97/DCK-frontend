import React from 'react';
import _ from 'underscore';
import SummonerStatList from './SummonerStatList.js';

export default ({ matchData }) => {
  return (
    <div className="summoner-stat-view-root match-stat flex-col flex-align-c">
      <SummonerStatList matchData={matchData} teamId={100} />
      <SummonerStatList matchData={matchData} teamId={200} />
    </div>
  );
};
