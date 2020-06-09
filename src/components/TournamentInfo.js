import React from 'react';
import { Link } from 'react-router-dom';
import './TournamentInfo.css';

class TournamentInfo extends React.Component {
  render() {
    return (
      <Link to={`/tournament/${this.props.tid}`} id="info-card">
        {/* <img src={process.env.PUBLIC_URL + '/dck_circle.png'} width="50" height="50"></img> */}
        <span id="tournament-title">{this.props.name}</span>
      </Link>
    );
  }
}

export default TournamentInfo;
