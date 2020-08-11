import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import moment from 'moment';
import { Radio } from 'antd';
import MainLayout from './layout/MainLayout';
import './MatchDetail.css';
import MatchDetailStat from './MatchDetailStat';

class MatchDetail extends React.Component {
  constructor() {
    super();

    this.state = { matchData: {}, team1: {}, team2: {}, round: '1' };

    this.onChangeRound = this.onChangeRound.bind(this);
    // this.findGameId = this.findGameId.bind(this);
  }

  async componentDidMount() {
    const res = await Axios.get(
      `http://localhost:8080/matchlists/by_matchgroup/${this.props.match.params.id}`
    );

    const team1 = res.data.Teams.find(t => {
      return t.id === res.data.team1_id;
    });
    const team2 = res.data.Teams.find(t => {
      return t.id === res.data.team2_id;
    });

    this.setState({
      matchData: res.data,
      team1: team1,
      team2: team2
    });
  }

  onChangeRound(e) {
    this.setState({
      round: e.target.value
    });
  }

  findGameId(round) {
    const match = this.state.matchData.Matches.find(m => {
      return `${m.round}` === round;
    });

    if (_.isUndefined(match)) {
      return 0;
    }

    return match.game_id;
  }

  render() {
    const { matchData, team1, team2 } = this.state;

    return (
      <MainLayout>
        {!_.isEmpty(matchData) ? (
          <div className="match-detail-root flex-col flex-j-c width-100">
            <h1 className="text-align-center">POSTGAME BREAKDOWN</h1>
            <div className="match-detail-score flex-row flex-j-c flex-align-c width-100">
              <div className="team-name">{team1.name}</div>
              <div className="team-score flex-row">
                <div>{matchData.team1_score}</div>
                <div> - </div>
                <div>{matchData.team2_score}</div>
              </div>
              <div className="team-name">{team2.name}</div>
            </div>
            <div className="match-statics">
              <Radio.Group
                defaultValue="1"
                buttonStyle="solid"
                size="large"
                onChange={this.onChangeRound}
              >
                {matchData.Matches.map((m, i) => {
                  //   <MatchDetailStat key={i} matchData={m} />;
                  return (
                    <Radio.Button key={i} value={`${i + 1}`}>
                      {`ROUND ${i + 1}`}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
              {/* <MatchDetailStat gameId={this.findGameId(this.state.round)} /> */}
              <div>{this.findGameId(this.state.round)}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </MainLayout>
    );
  }
}

export default MatchDetail;
