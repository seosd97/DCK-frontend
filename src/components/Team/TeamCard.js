import React from 'react';
import { Link } from 'react-router-dom';
import './TeamCard.css';

export default props => {
  const { teamData } = props;
  return (
    <Link to={`/team/${teamData.name}`} className="team-card-root">
      <h2 className="team-card-name">{teamData.name}</h2>
    </Link>
  );
};
