import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import numeral from 'numeral';
import SpellIcon from './Icons/SpellIcon';
import ChampionIcon from './Icons/ChampionIcon';
import RuneIcon from './Icons/RuneIcon';
import ItemIcon from './Icons/ItemIcon';
import Progress from './Utils/Progress';

class SummonerStatElem extends React.Component {
  constructor() {
    super();

    // this.getCSPerMin = this.getCSPerMin.bind(this);
  }

  calcKDA(stat) {
    const kda = (stat.kill + stat.assist) / stat.death;
    if (kda === Infinity) {
      return 'perfect';
    }
    return kda.toFixed(2);
  }

  getItemIdList(stat) {
    let result = [];
    for (let i = 0; i < 6; i++) {
      result.push(stat[`item${i}`]);
    }

    return result;
  }

  getCSPerMin() {
    const { summonerStat, gameTime } = this.props;
    const date = new Date(gameTime * 1000);

    return (
      (summonerStat.totalMinionsKilled + summonerStat.neutralMinionsKilled) / date.getMinutes()
    );
  }

  render() {
    const { summonerStat, summonerData, topDealt } = this.props;
    return (
      <section className="summoner-stat-elem flex-row flex-align-c">
        {/* {summonerStat.tripleKills > 0 && <div className="stat-penta">PENTA KILL</div>} */}
        <div className="stat-info flex-row flex-align-c">
          <div className="champion-icon">
            <ChampionIcon cid={summonerStat.cid} />
            <div className="champion-level">{summonerStat.champion_level}</div>
          </div>
          <div className="flex-col flex-j-c">
            <div className="spell-icon">
              <SpellIcon sid={summonerStat.spell1_id} />
            </div>
            <div className="spell-icon">
              <SpellIcon sid={summonerStat.spell2_id} />
            </div>
          </div>
          <div className="rune-icon flex-col flex-j-c">
            <div className="spell-icon">
              <RuneIcon styleId={summonerStat.perkPrimaryStyle} rid={summonerStat.rune0} />
            </div>
            <div className="spell-icon">
              <RuneIcon styleId={summonerStat.perkSubStyle} />
            </div>
          </div>
          <Link to={`/summoners/${summonerData.name}`} className="summoner-name">
            {summonerData.name}
          </Link>
        </div>
        <div className="stat-kda flex-col flex-j-c flex-align-c">
          <div className="text-align-center">{`${summonerStat.kill}/${summonerStat.death}/${summonerStat.assist}`}</div>
          {`${this.calcKDA(summonerStat)} KDA`}
        </div>
        <div className="stat-dealt flex-col flex-j-c flex-align-c">
          {numeral(summonerStat.totalDamageDealt).format('0,0')}
          <Progress
            val={(summonerStat.totalDamageDealt / topDealt) * 100}
            fillColor={summonerStat.camp_id === 100 ? 'var(--blue)' : 'var(--red)'}
            width="75px"
            height="5px"
            round="5px"
          />
        </div>
        <div className="stat-sight">{summonerStat.visionScore}</div>
        <div className="stat-cs flex-col flex-j-c">
          <div>{summonerStat.totalMinionsKilled + summonerStat.neutralMinionsKilled}</div>
          <div className="cs-per-min">({this.getCSPerMin().toFixed(1)})</div>
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

SummonerStatElem.defaultProps = {
  summonerStat: null,
  summonerData: null,
  topDealt: 0,
  duration: 0
};

export default SummonerStatElem;
