import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import moment from 'moment';
import { Radio } from 'antd';
import MainLayout from './layout/MainLayout';
import './MatchDetail.css';
import MatchDetailStat from './MatchDetailStat';
import Scoreboard from './Scoreboard';

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

  // isBlueWin() {
  //   const { matchData } = this.state;
  //   return matchData.team1_score > matchData.team2_score;
  // }

  render() {
    const { matchData, team1, team2 } = this.state;

    return (
      <MainLayout>
        {!_.isEmpty(matchData) ? (
          <div className="match-detail-root flex-col flex-j-c width-100">
            <section className="detail-header">
              <h1 className="text-align-center">POSTGAME BREAKDOWN</h1>
              <Scoreboard
                team1={team1.name}
                team2={team2.name}
                team1_score={matchData.team1_score}
                team2_score={matchData.team2_score}
                fontSize="2.3rem"
              />
            </section>
            <div className="match-statics flex-col flex-align-c">
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
              <MatchDetailStat gameId={this.findGameId(this.state.round)} />
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
