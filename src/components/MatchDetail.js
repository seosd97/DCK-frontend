import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import MatchInfo from './MatchInfo';
import DealtGraph from './MatchDealtGraph';
import './MatchDetail.css';

class MatchDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      matchData: {}
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:8080/match/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ matchData: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTopDealt(teams) {
    let topDealt = 0;
    for (let i in teams) {
      for (let j in teams[i].summoners) {
        const summoner = teams[i].summoners[j];
        if (summoner.totalDamageDealt > topDealt) {
          topDealt = summoner.totalDamageDealt;

          console.log(topDealt);
        }
      }
    }

    return topDealt;
  }

  render() {
    const { matchData } = this.state;
    const blueTeam = !_.isEmpty(matchData) && matchData.teams.find(t => t.camp_id === 100);
    const redTeam = !_.isEmpty(matchData) && matchData.teams.find(t => t.camp_id === 200);

    const topDealt = this.getTopDealt(matchData.teams);

    return (
      <div id="match-root">
        {!_.isEmpty(matchData) ? (
          <React.Fragment>
            <h1 id="match-title">
              {matchData.gameType.toUpperCase() + ` ROUND ${matchData.round}`}
            </h1>

            <div id="match-team-header">
              <div className="match-team-info blueteam">{blueTeam.teamName}</div>
              <span className={'game-result' + (blueTeam.win ? ' winner' : '')}>
                {blueTeam.win ? 'WIN' : 'LOSE'}
              </span>
              <span className="verses-colon">VS</span>
              <span className={'game-result' + (redTeam.win ? ' winner' : '')}>
                {redTeam.win ? 'WIN' : 'LOSE'}
              </span>
              <div className="match-team-info redteam">{redTeam.teamName}</div>
            </div>

            <div id="match-result-overview">
              <MatchInfo matchData={matchData} />
            </div>

            <div className="match-dealt-container flex-row width-100 flex-align-c">
              <DealtGraph summoners={blueTeam.summoners} topDealt={topDealt} />
              <DealtGraph summoners={redTeam.summoners} topDealt={topDealt} reverse />
            </div>
          </React.Fragment>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

export default MatchDetail;
