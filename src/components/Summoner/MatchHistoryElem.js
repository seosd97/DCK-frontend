import React from 'react';
import Axios from 'axios';
import _ from 'underscore';
import * as DDragon from '../../api/data-dragon';
import { render } from '@testing-library/react';
import ChampionIcon from '../Icons/ChampionIcon';
import moment from 'moment';
import SpellIcon from '../Icons/SpellIcon';
import RuneIcon from '../Icons/RuneIcon';

class MatchHistoryElem extends React.Component {
  constructor() {
    super();

    this.state = { champData: null };
  }

  async componentDidMount() {
    const { cid } = this.props.matchData.stat;
    const champData = await DDragon.getChampionByKey(cid);

    console.log(champData);
    this.setState({
      champData: champData
    });
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
    const { champData } = this.state;

    return (
      <div
        className={`summoner-match-history-elem flex-col ${matchData.stat.win ? ' win' : ' lose'}`}
      >
        <div className="match-info flex-row flex-align-c">
          <span className="match-type">{matchData.type}</span>
          <span className="match-round">{`round ${matchData.round}`}</span>
        </div>
        <div className="match-stat flex-row flex-align-c">
          <div className="match-result flex-col flex-j-c flex-align-c">
            <div>{matchData.stat.win ? '승리' : '패배'}</div>
            <div>{moment.unix(matchData.duration).format('mm분 ss초')}</div>
          </div>

          <div className="flex-row flex-align-c">
            <div className="flex-col flex-j-c">
              <SpellIcon sid={matchData.stat.spell1_id} />
              <SpellIcon sid={matchData.stat.spell2_id} />
            </div>
            <div className="flex-col flex-j-c">
              <RuneIcon styleId={matchData.stat.perkPrimaryStyle} rid={matchData.stat.rune0} />
              <RuneIcon styleId={matchData.stat.perkSubStyle} />
            </div>
          </div>

          <div className="flex-col flex-j-c flex-align-c">
            <ChampionIcon cid={matchData.stat.cid} size="40x40" />
            {champData !== null && <div>{champData.name}</div>}
          </div>
          <div>
            <div>{`${matchData.stat.kill} / ${matchData.stat.death} / ${matchData.stat.assist}`}</div>
            <div>
              {`KDA ${this.calcKDA(
                matchData.stat.kill,
                matchData.stat.death,
                matchData.stat.assist
              )}`}
            </div>
          </div>
          <div>
            <div>
              {`CS ${matchData.stat.totalMinionsKilled + matchData.stat.neutralMinionsKilled}`}
            </div>
            <div>
              {`(${(
                (matchData.stat.totalMinionsKilled + matchData.stat.neutralMinionsKilled) /
                moment.unix(matchData.duration).format('mm')
              ).toFixed(1)})`}
            </div>
          </div>
          <div>{`VS ${matchData.stat.visionScore}`}</div>
          <div className="flex-row flex-align-c">
            <div className="team-blue">
              {matchData.participants.map((p, i) => {
                if (p.team_id !== 100) return;
                return (
                  <div key={i} className="flex-row flex-align-c">
                    <ChampionIcon cid={p.cid} size="20x20" />
                    <span>{p.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="team-red">
              {matchData.participants.map((p, i) => {
                if (p.team_id !== 200) return;
                return (
                  <div key={i} className="flex-row flex-align-c">
                    <ChampionIcon cid={p.cid} size="20x20" />
                    <span>{p.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchHistoryElem;
