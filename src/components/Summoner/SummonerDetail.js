import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import ProfileIcon from '../Icons/ProfileIcon';
import MatchHistoryElem from './MatchHistoryElem';
import './SummonerDetail.css';
import MainLayout from '../layout/MainLayout';

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
            <div className="match-histories flex-col flex-j-c">
              {summonerData.matches.map((m, i) => {
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
