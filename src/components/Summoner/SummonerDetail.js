import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import ProfileIcon from '../Icons/ProfileIcon';
import MatchHistoryElem from './MatchHistoryElem';
import './SummonerDetail.css';
import MainLayout from '../layout/MainLayout';
import ChampionIcon from '../Icons/ChampionIcon';
import CircleProgress from '../Utils/CircleProgress';

class SummonerDetail extends React.Component {
  constructor() {
    super();

    this.refreshSummonerData = this.refreshSummonerData.bind(this);

    this.state = {
      summonerData: null
    };
  }

  async componentDidMount() {
    try {
      const res = await Axios.get(
        `http://localhost:8080/summoners/by_name/${this.props.match.params.name}`
      );

      this.setState({
        summonerData: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidUpdate() {
    if (this.state.summonerData.summoner.name === this.props.match.params.name) {
      return;
    }

    try {
      const res = await Axios.get(
        `http://localhost:8080/summoners/by_name/${this.props.match.params.name}`
      );

      this.setState({
        summonerData: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }

  async refreshSummonerData(e) {
    const oldData = this.state.summonerData;
    if (oldData === null) {
      return;
    }

    let classList = e.target.classList;
    classList.add('disabled');

    const res = await Axios(`http://localhost:8080/riot/summoners/${oldData.summoner.uuid}`);

    let newData = oldData;
    newData.summoner = res.data;

    classList.remove('disabled');

    this.setState({
      summonerData: newData
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
    const { summonerData } = this.state;
    const totalStat = summonerData && summonerData.matchList.totalStat;

    return (
      <MainLayout>
        {summonerData !== null ? (
          <div className="summoner-detail-root m-w-auto flex-col">
            <div className="summoner-info flex-row flex-align-c">
              <ProfileIcon iconId={summonerData.summoner.profile_icon_id} />
              <div className="summoner-desc">
                <div className="flex-row flex-align-c">
                  <h1 className="text-align-right">{summonerData.summoner.name}</h1>
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/reload.png`}
                    alt="reload.png"
                    width="15"
                    height="15"
                    onClick={this.refreshSummonerData}
                  />
                </div>
                <div className="summoner-level">{`Lv.${summonerData.summoner.summoner_level}`}</div>
              </div>
            </div>
            <div className="match-statics flex-row flex-j-c">
              <div className="statics-element">
                <div className="statics-desc">전적 요약</div>
                <div className="match-summary flex-row flex-j-c">
                  <div className="winrate-graph flex-row flex-j-c">
                    <CircleProgress
                      width="120"
                      height="120"
                      lineWidth="17px"
                      radius="50"
                      backgroundColor="var(--red)"
                      fillColor="var(--blue)"
                      value={(totalStat.wins / totalStat.games) * 100}
                      label={`${((totalStat.wins / totalStat.games) * 100).toFixed(1)}%`}
                      labelColor="var(--lightgray)"
                      fontSize="1.2rem"
                      fontWeight="bold"
                    />
                  </div>
                  <div className="match-stat flex-col flex-j-c flex-align-c">
                    <div className="match-result">{`${totalStat.games}전 ${totalStat.wins}승 ${totalStat.defeats}패`}</div>
                    <div>
                      {`${(totalStat.kills / totalStat.games).toFixed(1)}/${(
                        totalStat.deaths / totalStat.games
                      ).toFixed(1)}/${(totalStat.assists / totalStat.games).toFixed(1)}`}
                    </div>
                    <div>
                      {`KDA ${this.calcKDA(totalStat.kills, totalStat.deaths, totalStat.assists)}`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="statics-element">
                <div className="statics-desc">선호 챔피언</div>
                <div className="flex-col flex-align-c">
                  {summonerData.statics.slice(0, 3).map((s, i) => {
                    return (
                      <div key={i} className="champion-statics flex-row flex-align-c width-100">
                        <ChampionIcon cid={s.cid} />
                        <div className="champ-info flex-col flex-j-c">
                          <div className="champ-name">{s.championData.name}</div>
                          <div className="champ-stat flex-row flex-align-c">
                            {`${s.games}전 ${s.wins}승 ${s.defeats}패 | ${this.calcKDA(
                              s.kills,
                              s.deaths,
                              s.assists
                            )}`}
                            <div className="kda-desc">{'KDA'}</div>
                          </div>
                        </div>
                        <div className="champ-winrate flex-col flex-j-c flex-align-e">
                          <div className="winrate-desc">승률</div>
                          <div
                            className={'winrate' + (s.wins / s.games >= 0.6 ? ' tc-green' : '')}
                          >{`${Math.round((s.wins / s.games) * 100)}%`}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* <div className="statics-element">
                <div className="statics-desc">포지션</div>
              </div> */}
            </div>
            <div className="match-histories flex-col flex-j-c">
              {summonerData.matchList.matches.map((m, i) => {
                return <MatchHistoryElem key={i} matchData={m} uuid={summonerData.summoner.uuid} />;
              })}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </MainLayout>
    );
  }
}

export default SummonerDetail;
