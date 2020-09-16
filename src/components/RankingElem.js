import React from 'react';
import { Link } from 'react-router-dom';

export default ({ statData, rank }) => {
  return (
    <Link
      to={`/summoners/${statData.name}`}
      className="stat-ranking-elem-root flex-row flex-align-c width-100"
    >
      <div className="rank-desc">{`#${rank}`}</div>
      <div className="summoner-info flex-row flex-align-c">
        <img
          className="profile-icon"
          src={`http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${statData.profile_icon_id}.png`}
          alt={statData.profile_icon_id}
          width="60"
          height="60"
        ></img>
        <h2>{statData.name}</h2>
      </div>
      <div className="game-record flex-col flex-j-c flex-align-c">
        <div>
          {statData.games}전 {statData.wins}승 {statData.defeats}패
        </div>
        <div>{((statData.wins / statData.games) * 100).toFixed(1)}%</div>
      </div>
      <div className="kda-record flex-col flex-j-c flex-align-c">
        <div>{`${statData.kills}/${statData.deaths}/${statData.assists}`}</div>
        <div>{((statData.kills + statData.assists) / statData.deaths).toFixed(2)}</div>
      </div>
      <div className="vision-score">시야 {statData.visionScore.toFixed(1)}</div>
      <div className="cs">CS {statData.cs.toFixed(1)}</div>
    </Link>
  );
};
