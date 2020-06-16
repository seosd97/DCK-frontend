import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import TeamCard from './TeamCard';
import './TeamList.css';

class TeamList extends React.Component {
  constructor() {
    super();

    this.state = {
      tournaments: []
    };
  }

  async componentDidMount() {
    const res = await Axios.get('http://localhost:8080/tournaments/teams');
    this.setState({ tournaments: res.data.tournaments });
  }

  render() {
    const { tournaments } = this.state;
    return (
      <div className="teams-root flex-col">
        {!_.isEmpty(tournaments) &&
          tournaments.map((tournament, i) => {
            return (
              <div key={i} className="teams-container">
                <h1>{tournament.name}</h1>
                <div className="flex-row flex-wrap team-list">
                  {tournament.Teams.map((team, j) => {
                    return <TeamCard key={j} teamData={team} />;
                  })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default TeamList;
