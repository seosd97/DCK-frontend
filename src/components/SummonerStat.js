import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import SpellIcon from './Icons/SpellIcon';

class SummonerStat extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { summonerData } = this.props;
    return (
      <React.Fragment>
        {!_.isEmpty(summonerData) && (
          <div className="summoner-stat-root">
            <div className="flex-col">
              <SpellIcon sid={summonerData.stat.spell1_id} />
              <SpellIcon sid={summonerData.stat.spell2_id} />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default SummonerStat;
