import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import numeral from 'numeral';
import SpellIcon from './Icons/SpellIcon';
import ChampionIcon from './Icons/ChampionIcon';
import RuneIcon from './Icons/RuneIcon';
import ItemIcon from './Icons/ItemIcon';

class SummonerStatElem extends React.Component {
  constructor() {
    super();
  }

  calcKDA(stat) {
    return ((stat.kill + stat.assist) / stat.death).toFixed(2);
  }

  getItemIdList(stat) {
    let result = [];
    for (let i = 0; i < 6; i++) {
      result.push(stat[`item${i}`]);
    }

    return result;
  }

  render() {
    const { summonerStat, summonerData } = this.props;
    return (
      <section className="summoner-stat-elem flex-row flex-align-c">
        <div className="stat-info flex-row flex-align-c">
          <ChampionIcon cid={summonerStat.cid} size="40x40" />
          <div className="flex-col flex-j-c">
            <SpellIcon sid={summonerStat.spell1_id} />
            <SpellIcon sid={summonerStat.spell2_id} />
          </div>
          <div className="flex-col flex-j-c">
            <RuneIcon styleId={summonerStat.perkPrimaryStyle} rid={summonerStat.rune0} />
            <RuneIcon styleId={summonerStat.perkSubStyle} />
          </div>
          <div className="summoner-name">{summonerData.name}</div>
        </div>
        <div className="stat-kda flex-col flex-j-c flex-align-c">
          <div className="text-align-center">{`${summonerStat.kill}/${summonerStat.death}/${summonerStat.assist}`}</div>
          {`${this.calcKDA(summonerStat)} KDA`}
        </div>
        <div className="stat-dealt">{numeral(summonerStat.totalDamageDealt).format('0,0')}</div>
        <div className="stat-sight">{summonerStat.visionScore}</div>
        <div className="stat-cs flex-col flex-j-c">
          <div>{summonerStat.totalMinionsKilled + summonerStat.neutralMinionsKilled}</div>
          <div className="cs-per-min">({summonerStat.totalCSPerMin})</div>
        </div>
        <div className="stat-item">
          {this.getItemIdList(summonerStat).map((e, i) => {
            return <ItemIcon key={i} iid={e} />;
          })}
        </div>
      </section>
    );
  }
}

export default SummonerStatElem;
