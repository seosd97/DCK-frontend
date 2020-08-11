import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import MatchInfo from './MatchInfo';
import DealtGraph from './MatchDealtGraph';
import './MatchDetailStat.css';

class MatchDetailStat extends React.Component {
  constructor() {
    super();

    this.state = {
      matchData: {}
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:8080/matches/${this.props.gameId}`)
      .then(res => {
        this.setState({ matchData: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTopDealt(summoners) {
    let topDealt = 0;
    for (let i in summoners) {
      const summoner = summoners[i];
      if (summoner.totalDamageDealt > topDealt) {
        topDealt = summoner.totalDamageDealt;
      }
    }

    return topDealt;
  }

  render() {
    const { matchData } = this.state;
    const blueTeam = !_.isEmpty(matchData) && matchData.teams.find(t => t.team_id === 100);
    const redTeam = !_.isEmpty(matchData) && matchData.teams.find(t => t.team_id === 200);
    const blueTeamSummoners =
      !_.isEmpty(matchData) && matchData.summoners.filter(t => t.team_id === 100);
    const redTeamSummoners =
      !_.isEmpty(matchData) && matchData.summoners.filter(t => t.team_id === 200);

    const topDealt = this.getTopDealt(matchData.summoners);

    return (
      <div id="match-root">
        {!_.isEmpty(matchData) ? (
          <React.Fragment>
            <h1 id="match-title">
              {matchData.gameType.toUpperCase() + ` ROUND ${matchData.round}`}
            </h1>

            <div id="match-team-header">
              <Link to={`/team/${blueTeam.teamName}`} className="match-team-info blueteam">
                {blueTeam.teamName}
              </Link>
              <span className={'game-result' + (blueTeam.win ? ' winner' : '')}>
                {blueTeam.win ? 'WIN' : 'LOSE'}
              </span>
              <span className="verses-colon">VS</span>
              <span className={'game-result' + (redTeam.win ? ' winner' : '')}>
                {redTeam.win ? 'WIN' : 'LOSE'}
              </span>
              <Link to={`/team/${redTeam.teamName}`} className="match-team-info redteam">
                {redTeam.teamName}
              </Link>
            </div>

            <div id="match-result-overview">
              <MatchInfo matchData={matchData} />
            </div>

            <h2 id="dealt-graph-title" className="tc-black">
              DAMAGE DEALT TO CHAMPION
            </h2>
            <div className="match-dealt-container flex-row width-100 flex-align-c">
              <DealtGraph summoners={blueTeamSummoners} topDealt={topDealt} />
              <DealtGraph summoners={redTeamSummoners} topDealt={topDealt} reverse />
            </div>
          </React.Fragment>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

export default MatchDetailStat;
