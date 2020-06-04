import React from 'react';
import ChampionIcon from './Icons/ChampionIcon';
import SpellIcon from './Icons/SpellIcon';
import RuneIcon from './Icons/RuneIcon';
import './MatchSummonerElement.css';

class MatchSummonerInfo extends React.Component {
  constructor() {
    super();
  }

  getKDAColor(kda) {
    const num = parseInt(kda);
    switch (true) {
      case isNaN(num):
        return 'tc-red';
      case num >= 5:
        return 'tc-orange';
      case num >= 4:
        return 'tc-green';
      case num >= 3:
        return 'tc-blue';
      default:
        return 'tc-normal';
    }
  }

  render() {
    const { summonerData } = this.props;
    const kda = ((summonerData.kill + summonerData.assist) / summonerData.death).toFixed(2);
    const flexClass = this.props.reverse ? 'flex-row-r' : 'flex-row';
    return (
      <div>
        <div
          className={`summoner-name ${this.props.reverse ? 'text-align-right' : 'text-align-left'}`}
        >
          {summonerData.summonerName}
        </div>
        <div className={`${flexClass} summoner-elem`}>
          <div className="element-margin flex-col">
            <SpellIcon sid={summonerData.spell1_id} />
            <SpellIcon sid={summonerData.spell2_id} />
          </div>
          <div className="element-margin flex-col">
            <RuneIcon styleId={summonerData.perkPrimaryStyle} rid={summonerData.rune0} />
            <RuneIcon styleId={summonerData.perkSubStyle} onlyStone />
          </div>
          <ChampionIcon cid={summonerData.cid} />

          <div className="kda-area element-margin flex-col flex-align-c">
            <span>{`${summonerData.kill} / ${summonerData.death} / ${summonerData.assist}`}</span>
            <span className={this.getKDAColor(kda)}>{isNaN(parseInt(kda)) ? 'perfect' : kda}</span>
          </div>

          <div className="kda-area element-margin flex-col flex-align-c">
            <span>CS {summonerData.totalMinionsKilled}</span>
            <span>(10.0)</span>
          </div>

          <div className="flex-row element-margin">
            <div className="flex-col">
              <SpellIcon sid={summonerData.spell1_id} />
              <SpellIcon sid={summonerData.spell2_id} />
            </div>
            <div className="flex-col">
              <SpellIcon sid={summonerData.spell1_id} />
              <SpellIcon sid={summonerData.spell2_id} />
            </div>
            <div className="flex-col">
              <SpellIcon sid={summonerData.spell1_id} />
              <SpellIcon sid={summonerData.spell2_id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchSummonerInfo;
