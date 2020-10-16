import React from 'react';
import Axios from 'axios';
import numeral from 'numeral';
import moment from 'moment';
import _ from 'underscore';
import './MatchDetailStat.css';
import ChampionIcon from './Icons/ChampionIcon';
import DiffElement from './ui/DiffElement';
import SummonerStatView from './SummonerStatView';
import StatGraphView from './StatGraphView';

const { LeftElement, RightElement } = DiffElement;

let matchDataCache = [];

class MatchDetailStat extends React.Component {
  constructor() {
    super();

    this.state = {
      matchData: {},
      loading: true
    };

    matchDataCache = [];

    this.updateMatchData = this.updateMatchData.bind(this);
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

  findSummoner(uuid) {
    const { matchData } = this.state;
    if (_.isEmpty(matchData)) {
      return undefined;
    }

    const summoner = matchData.participants.find(s => {
      return s.uuid === uuid;
    });

    return summoner;
  }

  renderTeamStat(desc, leftElem, rightElem) {
    return (
      <div className="team-stat-elem flex-row flex-j-c flex-align-c width-100">
        <div className="team-stat-left">
          <span className="team-stat-subdesc">{desc}</span>
          {leftElem}
        </div>
        <div className="team-stat-desc">{desc}</div>
        <div className="team-stat-right">
          <span className="team-stat-subdesc">{desc}</span>
          {rightElem}
        </div>
      </div>
    );
  }

  calcTotalGold(campId) {
    const { matchData } = this.state;
    let totalGold = 0;
    matchData.stats.forEach(p => {
      if (p.camp_id === campId) {
        totalGold += p.goldEarned;
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
      matchData.stats.forEach(p => {
        if (p.camp_id === campId) {
          kills += p.kill;
          deaths += p.death;
          assists += p.assist;
        }
      });
    }

    return { kills: kills, deaths: deaths, assists: assists };
  }

  renderBan(teamId) {
    const teamData = this.state.matchData.teamStats.find(t => t.camp_id === teamId);
    if (_.isUndefined(teamData)) {
      return null;
    }

    return (
      <div className="flex-row flex-align-c">
        {teamData.bans.map((b, i) => {
          return (
            <div key={i} className="champion-icon-ban">
              <ChampionIcon cid={b.cid} />
            </div>
          );
        })}
      </div>
    );
  }

  renderObject(teamId) {
    const teamData = this.state.matchData.teamStats.find(t => t.camp_id === teamId);
    if (_.isUndefined(teamData)) {
      return null;
    }

    return (
      <div className="object-list flex-row flex-align-c">
        <div className="object-elem flex-row flex-align-c">
          <img
            src={`${process.env.PUBLIC_URL}/icons/tower-${teamData.camp_id}.png`}
            alt="tower-icon"
            className="object-icon"
          />
          <span className="object-desc">{teamData.towerKills}</span>
        </div>
        <div className="object-elem flex-row flex-align-c">
          <img
            src={`${process.env.PUBLIC_URL}/icons/inhibitor-${teamData.camp_id}.png`}
            alt="tower-icon"
            className="object-icon"
          />
          <span className="object-desc">{teamData.inhibitorKills}</span>
        </div>
        <div className="object-elem flex-row flex-align-c">
          <img
            src={`${process.env.PUBLIC_URL}/icons/dragon-${teamData.camp_id}.png`}
            alt="tower-icon"
            className="object-icon"
          />
          <span className="object-desc">{teamData.dragonKills}</span>
        </div>
        <div className="object-elem flex-row flex-align-c">
          <img
            src={`${process.env.PUBLIC_URL}/icons/herald-${teamData.camp_id}.png`}
            alt="tower-icon"
            className="object-icon"
          />
          <span className="object-desc">{teamData.riftHeraldKills}</span>
        </div>
        <div className="object-elem flex-row flex-align-c">
          <img
            src={`${process.env.PUBLIC_URL}/icons/baron-${teamData.camp_id}.png`}
            alt="tower-icon"
            className="object-icon"
          />
          <span className="object-desc">{teamData.baronKills}</span>
        </div>
      </div>
    );
  }

  render() {
    const { matchData, loading } = this.state;

    const blueTeam = !_.isEmpty(matchData) && matchData.teamStats.find(t => t.camp_id === 100);
    const redTeam = !_.isEmpty(matchData) && matchData.teamStats.find(t => t.camp_id === 200);

    const blueKDA = this.calcTeamKDA(100);
    const redKDA = this.calcTeamKDA(200);

    return (
      <div className="detail-stat-root flex-col flex-j-c width-100">
        {!loading ? (
          <React.Fragment>
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
                <div className={'team-name flex-row' + (redTeam.win ? ' winner' : '')}>
                  {redTeam.Team.name}
                  {redTeam.win && <span className="winner-token">WIN</span>}
                </div>
              </div>

              {this.renderTeamStat('밴', this.renderBan(100), this.renderBan(200))}
              {this.renderTeamStat(
                '골드',
                numeral(this.calcTotalGold(100)).format('0.0a'),
                numeral(this.calcTotalGold(200)).format('0.0a')
              )}
              {this.renderTeamStat(
                'KDA',
                `${blueKDA.kills}/${blueKDA.deaths}/${blueKDA.assists}`,
                `${redKDA.kills}/${redKDA.deaths}/${redKDA.assists}`
              )}
              {this.renderTeamStat('오브젝트', this.renderObject(100), this.renderObject(200))}
            </div>
            <SummonerStatView matchData={matchData} />
            <StatGraphView stats={matchData.stats} type="dealt" />
          </React.Fragment>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default MatchDetailStat;
