import React from 'react';
import StatGraphElem from './StatGraphElem';
import './StatGraphView.css';

const statCols = {
  dealt: 'totalDamageDealt',
  gold: 'goldEarned'
};

class StatGraphView extends React.Component {
  constructor() {
    super();

    this.state = {
      topValue: 0
    };
  }

  filterStat(key) {
    let result = { stats: [], topValue: 0 };
    const { stats } = this.props;
    if (stats === undefined) {
      return null;
    }

    stats.forEach(s => {
      if (result.topValue < s[key]) {
        result.topValue = s[key];
      }

      result.stats.push({
        cid: s.cid,
        team_id: s.camp_id,
        value: s[key]
      });
    });

    return result;
  }

  render() {
    const { stats, type } = this.props;
    if (stats === undefined) {
      return null;
    }

    const data = this.filterStat(statCols[type]);
    const blueTeam = data.stats.filter(s => {
      return s.team_id === 100;
    });
    const redTeam = data.stats.filter(s => {
      return s.team_id === 200;
    });

    return (
      <div className="stat-graph-view flex-row flex-align-c">
        <div className="team-blue flex-col width-100">
          {blueTeam.map((p, i) => {
            return <StatGraphElem key={i} data={p} topValue={data.topValue} />;
          })}
        </div>
        <div className="team-red flex-col width-100">
          {redTeam.map((p, i) => {
            return <StatGraphElem key={i} data={p} topValue={data.topValue} reverse />;
          })}
        </div>
      </div>
    );
  }
}

export default StatGraphView;
