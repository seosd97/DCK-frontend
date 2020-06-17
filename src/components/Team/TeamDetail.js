import React from 'react';
import Axios from 'axios';
import _ from 'underscore';
import numeral from 'numeral';
import './TeamDetail.css';

class TeamDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      teamData: {}
    };
  }

  async componentDidMount() {
    const res = await Axios.get(`http://localhost:8080/team/${this.props.match.params.name}`);
    this.setState({
      teamData: res.data
    });
  }

  render() {
    const { teamData } = this.state;
    return (
      <div className="team-detail-root flex-col">
        {!_.isEmpty(teamData) && (
          <React.Fragment>
            <div className="team-detail-title">
              <h1 className="team-title-name text-align-left">{teamData.name}</h1>
              <h2 className="team-title-season text-align-left">{`${numeral(1).format(
                '0o'
              )} place at ${teamData.TournamentGroup.name}`}</h2>
            </div>
            <div>
              {teamData.Summoners.map((s, i) => {
                return <div key={i}>{s.name}</div>;
              })}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default TeamDetail;
