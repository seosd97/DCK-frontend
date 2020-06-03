import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import MatchInfo from './MatchInfo';
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

  render() {
    const { matchData } = this.state;
    const blueTeam = !_.isEmpty(matchData) && matchData.teams.find(t => t.camp_id === 100);
    const redTeam = !_.isEmpty(matchData) && matchData.teams.find(t => t.camp_id === 200);

    return (
      <div id="match-root">
        {!_.isEmpty(matchData) ? (
          <React.Fragment>
            <h1 id="match-title">
              {matchData.gameType.toUpperCase() + ` ROUND ${matchData.round}`}
            </h1>
            <div id="match-result-header">
              <div className="match-team-info-blue">{blueTeam.teamName}</div>
              <span
                className={
                  (blueTeam.win ? 'game-result-winner' : 'game-result-loser') + ' game-result'
                }
              >
                {blueTeam.win ? 'WIN' : 'LOSE'}
              </span>
              <span className="verses-colon">VS</span>
              <span
                className={
                  redTeam.win ? 'game-result-winner' : 'game-result-loser' + ' game-result'
                }
              >
                {redTeam.win ? 'WIN' : 'LOSE'}
              </span>
              <div className="match-team-info-red">{redTeam.teamName}</div>
            </div>

            <div id="match-result-overview">
              <MatchInfo matchData={matchData} />
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
