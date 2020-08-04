import React from 'react';
import { Link } from 'react-router-dom';
import './TournamentElement.css';

export default props => {
  const { tournamentData } = props;

  return (
    <Link
      to={`/tournaments/${tournamentData.id}`}
      className="tournament-info-root flex-row flex-align-c width-100"
    >
      {/* <img
        src={`${process.env.PUBLIC_URL}/lol_icon_old.jpg`}
        alt="lol_logo"
        width="50"
        height="50"
      ></img> */}
      <img
        src={`${process.env.PUBLIC_URL}/dck_logo_circle.png`}
        alt="dck_logo"
        width="50"
        height="50"
        className="tournament-logo"
      ></img>
      <div className="tournament-name text-align-center width-100">{tournamentData.name}</div>
    </Link>
  );
};
