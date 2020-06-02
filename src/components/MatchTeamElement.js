import React from 'react';
import StatItem from './StatComparison';

export default props => {
  const blueTeam = props.teams.find(t => t.camp_id === 100);
  const redTeam = props.teams.find(t => t.camp_id === 200);

  return (
    <div>
      <StatItem
        leftVal={`${blueTeam.kills}/${blueTeam.deaths}/${blueTeam.assists}`}
        rightVal={`${redTeam.kills}/${redTeam.deaths}/${redTeam.assists}`}
        stat="KDA"
      />
      <StatItem leftVal={blueTeam.towerKills} rightVal={redTeam.towerKills} stat="GOLD" />
      <StatItem leftVal={blueTeam.towerKills} rightVal={redTeam.towerKills} stat="TOWERS" />
      <StatItem
        leftVal={blueTeam.riftHeraldKills}
        rightVal={redTeam.riftHeraldKills}
        stat="HERALDS"
      />
      <StatItem leftVal={blueTeam.dragonKills} rightVal={redTeam.dragonKills} stat="DRAGONS" />
      <StatItem leftVal={blueTeam.elderKills} rightVal={redTeam.elderKills} stat="ELDERS" />
      <StatItem leftVal={blueTeam.baronKills} rightVal={redTeam.baronKills} stat="BARONS" />
    </div>
  );
};
