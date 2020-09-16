import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import ProfileIcon from '../Icons/ProfileIcon';
import SummonerMatchList from './SummonerMatchList';
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
        <div className="summoner-detail-root m-w-auto">
          {summonerData !== null ? (
            <React.Fragment>
              <div className="summoner-info flex-row">
                <ProfileIcon iconId={summonerData.profile_icon_id} />
                <h1 className="text-align-right">{summonerData.name}</h1>
              </div>
              <div>{/* TOurnament History */}</div>
              <div className="summoner-statics"></div>
              {/* <SummonerMatchList uuid={summonerData.uuid} /> */}
            </React.Fragment>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </MainLayout>
    );
  }
}

export default SummonerDetail;
