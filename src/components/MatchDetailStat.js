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
import DiffElement from './ui/DiffElement';

const { LeftElement, RightElement } = DiffElement;

let matchDataCache = [];

class MatchDetailStat extends React.Component {
  constructor() {
    super();

    this.state = {
      matchData: {},
      loading: true
    };

    this.updateMatchData = this.updateMatchData.bind(this);
    this.calcTotalGold = this.calcTotalGold.bind(this);
  }

  componentDidMount() {
    this.updateMatchData(this.props.gameId);
  }

  componentDidUpdate() {
    if (this.state.loading) {
      return;
    }

    if (!_.isEmpty(this.state.matchData) && this.props.gameId === this.state.matchData.game_id) {
      return;
    }

    this.updateMatchData(this.props.gameId);
  }

  updateMatchData(gameId) {
    const cacheData = matchDataCache.find(m => {
      return m.game_id === gameId;
    });

    if (!_.isUndefined(cacheData)) {
      this.setState({ matchData: cacheData });
      return;
    }

    if (!this.state.loading) {
      this.setState({ loading: true });
    }

    Axios.get(`http://localhost:8080/matches/${gameId}`)
      .then(res => {
        matchDataCache.push(res.data);
        this.setState({ matchData: res.data, loading: false });
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

  renderBan(teamData) {
    if (_.isUndefined(teamData)) {
      return null;
    }

    return (
      <div className="flex-row flex-align-c">
        {teamData.bans.map((b, i) => {
          return <ChampionIcon key={i} cid={b.cid} size="30x30" />;
        })}
      </div>
    );
  }

  renderObject(teamData) {
    if (_.isUndefined(teamData)) {
      return null;
    }

    return (
      <div className="flex-row flex-align-c">
        <IconLabel
          src={`${process.env.PUBLIC_URL}/icons/tower-${teamData.camp_id}.png`}
          desc={teamData.towerKills}
        />
        <IconLabel
          src={`${process.env.PUBLIC_URL}/icons/inhibitor-${teamData.camp_id}.png`}
          desc={teamData.inhibitorKills}
        />
        <IconLabel
          src={`${process.env.PUBLIC_URL}/icons/dragon-${teamData.camp_id}.png`}
          desc={teamData.dragonKills}
        />
        <IconLabel
          src={`${process.env.PUBLIC_URL}/icons/herald-${teamData.camp_id}.png`}
          desc={teamData.riftHeraldKills}
        />
        <IconLabel
          src={`${process.env.PUBLIC_URL}/icons/baron-${teamData.camp_id}.png`}
          desc={teamData.baronKills}
        />
      </div>
    );
  }

  render() {
    const { matchData, loading } = this.state;

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
        {!loading ? (
          <div className="detail-stat-root flex-col flex-j-c width-100">
            <div className="game-info flex-row flex-align-c">
              <div className="game-time">{moment.unix(matchData.duration).format('mm:ss')}</div>
              <div className="game-details flex-col flex-j-c flex-align-e">
                <div>{moment(matchData.game_creation).format('YYYY.MM.DD HH:mm')}</div>
                <div>ver {matchData.game_version.split('.', 2).join('.')}</div>
              </div>
            </div>
            <div className="team-info flex-col flex-align-c">
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
              <div className="team-stat-list flex-col flex-j-c width-100">
                <DiffElement desc="밴">
                  <LeftElement>{this.renderBan(blueTeam)}</LeftElement>
                  <RightElement>{this.renderBan(redTeam)}</RightElement>
                </DiffElement>
                <DiffElement desc="골드">
                  <LeftElement>{numeral(this.calcTotalGold(100)).format('0.0a')}</LeftElement>
                  <RightElement>{numeral(this.calcTotalGold(200)).format('0.0a')}</RightElement>
                </DiffElement>
                <DiffElement desc="KDA">
                  <LeftElement>{`${blueKDA.kills}/${blueKDA.deaths}/${blueKDA.assists}`}</LeftElement>
                  <RightElement>{`${redKDA.kills}/${redKDA.deaths}/${redKDA.assists}`}</RightElement>
                </DiffElement>
                <DiffElement desc="오브젝트">
                  <LeftElement>{this.renderObject(blueTeam)}</LeftElement>
                  <RightElement>{this.renderObject(redTeam)}</RightElement>
                </DiffElement>
              </div>
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
