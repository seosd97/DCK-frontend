import React from 'react';

export default ({ statData, rank }) => {
  return (
    <div className="stat-ranking-elem-root flex-row flex-align-c width-100">
      <div>{`#${rank}`}</div>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${statData.profile_icon_id}.png`}
        alt={statData.profile_icon_id}
        width="60"
        height="60"
      ></img>
      <h2>{statData.name}</h2>
      <div className="flex-col flex-j-c flex-align-c">
        <div>
          {statData.wins}승 {statData.defeats}패
        </div>
        <div>{((statData.wins / statData.games) * 100).toFixed(1)}%</div>
      </div>
      <div className="flex-col flex-j-c flex-align-c">
        <div>{`${statData.kills}/${statData.deaths}/${statData.assists}`}</div>
        <div>{((statData.kills + statData.assists) / statData.deaths).toFixed(2)}</div>
      </div>
      <div>시야 {statData.visionScore}</div>
      <div>CS {statData.cs.toFixed(1)}</div>
    </div>
  );
};
