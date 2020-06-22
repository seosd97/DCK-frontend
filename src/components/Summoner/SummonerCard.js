import React from 'react';
import { Link } from 'react-router-dom';
import './SummonerCard.css';

export default props => {
  const { summonerInfo } = props;
  return (
    <Link to={`/summoner/${summonerInfo.name}`} className="summoner-card-root">
      <div className="summoner-card-name tc-black">{summonerInfo.name}</div>
    </Link>
  );
};
