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
    const { matchData, uuid } = this.props;

    const stat = matchData.stats.find(s => s.summoner_uuid === uuid);

    return (
      <div className={`summoner-match-history-elem flex-col ${stat.win ? ' win' : ' lose'}`}>
        <div className="match-stat flex-row  flex-align-c">
          <div className="match-info flex-col flex-j-c flex-align-c width-100">
            <div className="match-info-type flex-col flex-j-c flex-align-c">
              <span className="match-type">{matchData.type}</span>
              <span className="match-round">{`round ${matchData.round}`}</span>
            </div>
            <div className="match-info-result flex-col flex-j-c flex-align-c">
              <span className={'t-bold' + (stat.win ? ' tc-blue' : ' tc-red')}>
                {stat.win ? '승리' : '패배'}
              </span>
              <span className="match-time">
                {moment.unix(matchData.duration).format('mm분 ss초')}
              </span>
            </div>
          </div>
          <div className="stat-detail flex-row flex-align-c width-100">
            <div className="champion-info flex-row flex-align-c">
              <div className="champion-icon info-icon flex-col">
                <ChampionIcon cid={stat.cid} width="50" height="50" />
                <div className="champion-level">{stat.champion_level}</div>
              </div>
              <div className="info-icon flex-col flex-j-c">
                <SpellIcon sid={stat.spell1_id} width="25px" height="25px" />
                <SpellIcon sid={stat.spell2_id} width="25px" height="25px" />
              </div>
              <div className="info-icon flex-col flex-j-c">
                <RuneIcon
                  styleId={stat.perkPrimaryStyle}
                  rid={stat.rune0}
                  width="25px"
                  height="25px"
                />
                <RuneIcon styleId={stat.perkSubStyle} width="25px" height="25px" />
              </div>
            </div>

            <div className="stat-kda flex-col flex-align-c">
              <div>{`${stat.kill} / ${stat.death} / ${stat.assist}`}</div>
              <div className="sub-stat flex-row flex-j-c flex-align-c">
                <div className="kda-desc">KDA</div>
                {this.calcKDA(stat.kill, stat.death, stat.assist)}
              </div>
            </div>
            <div className="stat-cs flex-col flex-align-c">
              <div>{`CS ${stat.totalMinionsKilled + stat.neutralMinionsKilled}`}</div>
              <div className="sub-stat cs-per-m">
                {`(${(
                  (stat.totalMinionsKilled + stat.neutralMinionsKilled) /
                  moment.unix(matchData.duration).format('mm')
                ).toFixed(1)})`}
              </div>
            </div>
            <div className="stat-vision">{`시야 ${stat.visionScore}`}</div>
            <div className="item-container">
              <ItemIcon iid={stat.item0} />
              <ItemIcon iid={stat.item1} />
              <ItemIcon iid={stat.item2} />
              <ItemIcon iid={stat.item3} />
              <ItemIcon iid={stat.item4} />
              <ItemIcon iid={stat.item5} />
            </div>
            <div className="stat-participants flex-row flex-j-c flex-align-c">
              <div className="participants-list">
                {matchData.stats.map((s, i) => {
                  if (s.camp_id !== 100) return;
                  return (
                    <div key={i} className="participant-elem flex-row flex-align-c">
                      <ChampionIcon cid={s.cid} width="20" height="20" />
                      <Link
                        to={`/summoners/${
                          matchData.participants.find(p => p.uuid === s.summoner_uuid).name
                        }`}
                        className="participant-name"
                      >
                        {matchData.participants.find(p => p.uuid === s.summoner_uuid).name}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="participants-list">
                {matchData.stats.map((s, i) => {
                  if (s.camp_id !== 200) return;
                  return (
                    <div key={i} className="participant-elem flex-row flex-align-c">
                      <ChampionIcon cid={s.cid} width="20" height="20" />
                      <Link
                        to={`/summoners/${
                          matchData.participants.find(p => p.uuid === s.summoner_uuid).name
                        }`}
                        className="participant-name"
                      >
                        {matchData.participants.find(p => p.uuid === s.summoner_uuid).name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <Link to={`/matches/${matchData.MatchGroupId}`} className="detail-link">
              〉
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchHistoryElem;
