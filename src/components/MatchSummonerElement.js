import React from 'react';
import Moment from 'moment';
import Numeral from 'numeral';
import ChampionIcon from './Icons/ChampionIcon';
import SpellIcon from './Icons/SpellIcon';
import RuneIcon from './Icons/RuneIcon';
import ItemIcon from './Icons/ItemIcon';
import './MatchSummonerElement.css';

class MatchSummonerInfo extends React.Component {
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

  getCSPerMin(cs) {
    const gameTime = parseInt(Moment.unix(this.props.duration).format('mm'), 10);

    return Numeral(cs / gameTime).format('0.0a');
  }

  render() {
    const { summonerData } = this.props;
    const kda = ((summonerData.kill + summonerData.assist) / summonerData.death).toFixed(2);
    const totalCS = summonerData.totalMinionsKilled + summonerData.neutralMinionsKilled;
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
            <RuneIcon styleId={summonerData.perkSubStyle} />
          </div>
          <ChampionIcon cid={summonerData.cid} round />

          <div className="kda-area element-margin flex-col flex-align-c">
            <span>{`${summonerData.kill} / ${summonerData.death} / ${summonerData.assist}`}</span>
            <span className={this.getKDAColor(kda)}>{isNaN(parseInt(kda)) ? 'perfect' : kda}</span>
          </div>

          <div className="kda-area element-margin flex-col flex-align-c">
            <span>CS {totalCS}</span>
            <span>( {this.getCSPerMin(totalCS)} )</span>
          </div>

          <div className="item-container">
            <ItemIcon iid={summonerData.item0} />
            <ItemIcon iid={summonerData.item1} />
            <ItemIcon iid={summonerData.item2} />
            <ItemIcon iid={summonerData.item3} />
            <ItemIcon iid={summonerData.item4} />
            <ItemIcon iid={summonerData.item5} />
          </div>
        </div>
      </div>
    );
  }
}

export default MatchSummonerInfo;
