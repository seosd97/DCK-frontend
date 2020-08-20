import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import numeral from 'numeral';
import moment from 'moment';
import _ from 'underscore';
import MatchInfo from './MatchInfo';
import DealtGraph from './MatchDealtGraph';
import './MatchDetailStat.css';
import ChampionIcon from './Icons/ChampionIcon';
import IconLabel from './ui/IconLabel';
import SummonerStat from './SummonerStat';
import Scoreboard from './Scoreboard';

class MatchDetailStat extends React.Component {
  constructor() {
    super();

    this.state = {
      matchData: {}
    };

    this.calcTotalGold = this.calcTotalGold.bind(this);
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

  calcTotalGold(campId) {
    const { matchData } = this.state;
    let totalGold = 0;
    matchData.participants.forEach(p => {
      if (p.team_id === campId) {
        totalGold += p.stat.goldEarned;
      }
    });

    return totalGold;
  }

  calcTeamKDA(campId) {
    const { matchData } = this.state;
    let kills = 0;
    let deaths = 0;
    let assists = 0;

    if (!_.isEmpty(matchData)) {
      matchData.participants.forEach(p => {
        if (p.team_id === campId) {
          kills += p.stat.kill;
          deaths += p.stat.death;
          assists += p.stat.assist;
        }
      });
    }

    return { kills: kills, deaths: deaths, assists: assists };
  }

  render() {
    const { matchData } = this.state;
    const blueTeam = !_.isEmpty(matchData) && matchData.teamStats.find(t => t.camp_id === 100);
    const redTeam = !_.isEmpty(matchData) && matchData.teamStats.find(t => t.camp_id === 200);
    const blueParticipants =
      !_.isEmpty(matchData) && matchData.participants.filter(p => p.team_id === 100);
    const redParticipants =
      !_.isEmpty(matchData) && matchData.participants.filter(p => p.team_id === 200);

    const topDealt = this.getTopDealt(matchData.summoners);

    const blueKDA = this.calcTeamKDA(100);
    const redKDA = this.calcTeamKDA(200);

    return (
      <React.Fragment>
        {!_.isEmpty(matchData) ? (
          <div className="detail-stat-root flex-col flex-j-c width-100">
            <div className="game-info flex-row flex-align-c">
              <div className="game-time">{moment.unix(matchData.duration).format('mm:ss')}</div>
              <div className="game-details flex-col flex-j-c flex-align-e">
                <div>{moment(matchData.game_creation).format('YYYY.MM.DD HH:mm')}</div>
                <div>ver {matchData.game_version.split('.', 2).join('.')}</div>
              </div>
            </div>
            <div className="team-stat flex-col flex-align-c">
              <div className="detail-scoreboard flex-row flex-align-c">
                <div className={'team-name flex-row flex-j-e' + (blueTeam.win ? ' winner' : '')}>
                  {blueTeam.win && <span className="winner-token">WIN</span>}
                  {blueTeam.Team.name}
                </div>
                <div className="scoreboard flex-row flex-align-c">
                  <div className="score score-b">{blueKDA.kills}</div>
                  <div className="score score-r">{redKDA.kills}</div>
                </div>
                <div className={'team-name' + (redTeam.win ? ' winner' : '')}>
                  {redTeam.Team.name}
                  {redTeam.win && <span className="winner-token">WIN</span>}
                </div>
              </div>
              {/* temp */}
              <div className="temp-team-stat">밴</div>
              <div className="temp-team-stat">골드</div>
              <div className="temp-team-stat">KDA</div>
              <div className="temp-team-stat">오브젝트</div>
            </div>
            <div className="match-stat flex-col flex-align-c"></div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </React.Fragment>
    );
  }
}

export default MatchDetailStat;
