import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import ProfileIcon from '../Icons/ProfileIcon';
import MatchHistoryElem from './MatchHistoryElem';
import './SummonerDetail.css';
import MainLayout from '../layout/MainLayout';
import ChampionIcon from '../Icons/ChampionIcon';
import Progress from '../Utils/Progress';
import CircleProgress from '../Utils/CircleProgress';

class SummonerDetail extends React.Component {
  constructor() {
    super();

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

  render() {
    const { summonerData } = this.state;
    const totalStat = summonerData && summonerData.matchList.totalStat;

    return (
      <MainLayout>
        {summonerData !== null ? (
          <div className="summoner-detail-root m-w-auto flex-col">
            <div className="summoner-info flex-row flex-align-c">
              <ProfileIcon iconId={summonerData.profile_icon_id} />
              <div className="summoner-desc">
                <h1 className="text-align-right">{summonerData.name}</h1>
                <div className="summoner-level">{`Lv.${summonerData.summoner_level}`}</div>
              </div>
            </div>
            <div className="match-statics flex-row flex-j-c flex-align-c">
              <div className="statics-champ-most flex-col flex-j-c">
                {summonerData.statics.slice(0, 3).map((s, i) => {
                  return (
                    <div key={i} className="flex-row">
                      <ChampionIcon cid={s.cid} size="40x40" />
                      <div className="flex-col flex-j-c flex-align-c">
                        {s.games}전 {s.wins}승 {s.defeats}패
                        <div>{`(${((s.wins / s.games) * 100).toFixed(1)}%)`}</div>
                      </div>
                      <div className="flex-col flex-j-c flex-align-c">
                        {s.kills}/{s.deaths}/{s.assists}
                        <div>{((s.kills + s.assists) / s.deaths).toFixed(1)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="statics-winrate flex-col flex-j-c flex-align-c">
                {`${totalStat.games}전 ${totalStat.wins}승 ${totalStat.defeats}패`}
                <CircleProgress
                  width="90"
                  height="90"
                  lineWidth="17px"
                  radius="35"
                  backgroundColor="var(--team-color-red)"
                  fillColor="var(--team-color-blue)"
                  value={(totalStat.wins / totalStat.games) * 100}
                  label={`${((totalStat.wins / totalStat.games) * 100).toFixed(1)}%`}
                  fontSize=".8rem"
                />
              </div>
            </div>
            <div className="match-histories flex-col flex-j-c">
              {summonerData.matchList.matches.map((m, i) => {
                return <MatchHistoryElem key={i} matchData={m} />;
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
