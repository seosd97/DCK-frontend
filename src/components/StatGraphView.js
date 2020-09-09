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
    const { participants } = this.props;
    if (participants === undefined) {
      return null;
    }

    participants.forEach(p => {
      if (result.topValue < p.stat[key]) {
        result.topValue = p.stat[key];
      }

      result.stats.push({
        cid: p.cid,
        team_id: p.team_id,
        value: p.stat[key]
      });
    });

    return result;
  }

  render() {
    const { participants, type } = this.props;
    if (participants === undefined) {
      return null;
    }

    const data = this.filterStat(statCols[type]);
    const blueTeam = data.stats.filter(p => {
      return p.team_id === 100;
    });
    const redTeam = data.stats.filter(p => {
      return p.team_id === 200;
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
