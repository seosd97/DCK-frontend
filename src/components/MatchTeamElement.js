import React from 'react';
import StatItem from './StatComparison';
import numeral from 'numeral';
import './MatchTeamElement.css';

export default props => {
  const blueTeam = props.teams.find(t => t.camp_id === 100);
  const redTeam = props.teams.find(t => t.camp_id === 200);

  return (
    <div className="flex-col flex-align-c width-100">
      <StatItem
        lVal={`${blueTeam.kills} / ${blueTeam.deaths} / ${blueTeam.assists}`}
        rVal={`${redTeam.kills} / ${redTeam.deaths} / ${redTeam.assists}`}
        stat="KDA"
      />
      <StatItem
        lVal={numeral(blueTeam.teamGold).format('0.0a')}
        rVal={numeral(redTeam.teamGold).format('0.0a')}
        stat="GOLD"
      />
      <StatItem lVal={blueTeam.towerKills} rVal={redTeam.towerKills} stat="TOWERS" />
      <StatItem lVal={blueTeam.riftHeraldKills} rVal={redTeam.riftHeraldKills} stat="HERALDS" />
      <StatItem lVal={blueTeam.dragonKills} rVal={redTeam.dragonKills} stat="DRAGONS" />
      <StatItem lVal={blueTeam.baronKills} rVal={redTeam.baronKills} stat="BARONS" />
    </div>
  );
};
