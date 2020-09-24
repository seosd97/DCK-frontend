import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import * as DDragon from '../../api/data-dragon';
import { render } from '@testing-library/react';
import ChampionIcon from '../Icons/ChampionIcon';
import moment from 'moment';
import SpellIcon from '../Icons/SpellIcon';
import RuneIcon from '../Icons/RuneIcon';
import ItemIcon from '../Icons/ItemIcon';

class MatchHistoryElem extends React.Component {
  constructor() {
    super();
  }

  calcKDA(k, d, a) {
    const kda = (k + a) / d;

    if (kda === Infinity) {
      return 'perfect';
    }

    return kda.toFixed(1);
  }

  render() {
    const { matchData } = this.props;

    return (
      <Link
        to={`/matches/${matchData.MatchGroupId}`}
        className={`summoner-match-history-elem flex-col ${matchData.stat.win ? ' win' : ' lose'}`}
      >
        <div className="match-info flex-row flex-align-c">
          <span className="match-type">{matchData.type}</span>
          <span className="match-round">{`round ${matchData.round}`}</span>
        </div>
        <div className="match-stat flex-row flex-align-c">
          <div className="stat-result flex-col flex-j-c flex-align-c">
            <span className={'t-bold' + (matchData.stat.win ? ' tc-blue' : ' tc-red')}>
              {matchData.stat.win ? '승리' : '패배'}
            </span>
            <span className="match-time">
              {moment.unix(matchData.duration).format('mm분 ss초')}
            </span>
          </div>
          <div className="champion-info flex-row flex-align-c">
            <div className="champion-icon flex-col">
              <ChampionIcon cid={matchData.stat.cid} size="50x50" />
              <div className="champion-level">{matchData.stat.champion_level}</div>
            </div>
            <div className="spell-container flex-col flex-j-c">
              <SpellIcon sid={matchData.stat.spell1_id} width="25px" height="25px" />
              <SpellIcon sid={matchData.stat.spell2_id} width="25px" height="25px" />
            </div>
            <div className="rune-container flex-col flex-j-c">
              <RuneIcon
                styleId={matchData.stat.perkPrimaryStyle}
                rid={matchData.stat.rune0}
                width="25px"
                height="25px"
              />
              <RuneIcon styleId={matchData.stat.perkSubStyle} width="25px" height="25px" />
            </div>
          </div>

          <div className="stat-kda flex-col flex-align-c">
            <div>{`${matchData.stat.kill} / ${matchData.stat.death} / ${matchData.stat.assist}`}</div>
            <div className="sub-stat flex-row flex-j-c flex-align-c">
              <div className="kda-desc">KDA</div>
              {this.calcKDA(matchData.stat.kill, matchData.stat.death, matchData.stat.assist)}
            </div>
          </div>
          <div className="stat-cs flex-col flex-align-c">
            <div>
              {`CS ${matchData.stat.totalMinionsKilled + matchData.stat.neutralMinionsKilled}`}
            </div>
            <div className="sub-stat cs-per-m">
              {`(${(
                (matchData.stat.totalMinionsKilled + matchData.stat.neutralMinionsKilled) /
                moment.unix(matchData.duration).format('mm')
              ).toFixed(1)})`}
            </div>
          </div>
          <div className="stat-vision">{`시야 ${matchData.stat.visionScore}`}</div>
          <div className="item-container">
            <ItemIcon iid={matchData.stat.item0} />
            <ItemIcon iid={matchData.stat.item1} />
            <ItemIcon iid={matchData.stat.item2} />
            <ItemIcon iid={matchData.stat.item3} />
            <ItemIcon iid={matchData.stat.item4} />
            <ItemIcon iid={matchData.stat.item5} />
          </div>
          <div className="stat-participants flex-row flex-j-c flex-align-c">
            <div className="participants-list">
              {matchData.participants.map((p, i) => {
                if (p.team_id !== 100) return;
                return (
                  <div key={i} className="participant-elem flex-row flex-align-c">
                    <ChampionIcon cid={p.cid} size="20x20" />
                    <Link to={`/summoners/${p.name}`} className="participant-name">
                      {p.name}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="participants-list">
              {matchData.participants.map((p, i) => {
                if (p.team_id !== 200) return;
                return (
                  <div key={i} className="participant-elem flex-row flex-align-c">
                    <ChampionIcon cid={p.cid} size="20x20" />
                    <Link to={`/summoners/${p.name}`} className="participant-name">
                      {p.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default MatchHistoryElem;
