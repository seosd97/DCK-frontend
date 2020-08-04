import React from 'react';
import SummonerStat from '../MatchSummonerElement';
import ChampionIcon from '../Icons/ChampionIcon';

export default props => {
  const { matchData, uuid } = props;
  const mainStat = matchData.summoners.find(s => {
    return s.Summoner.uuid === uuid;
  });
  const color = mainStat.win ? 'tc-green' : 'tc-red';
  const borderStyle = {
    // borderLeft: `6px solid ${mainStat.win ? 'var(--green)' : 'var(--team-color-red'}`,
    // borderRadius: '2px'
  };

  return (
    <div style={borderStyle}>
      <div>
        {matchData.teams[0].teamName} VS {matchData.teams[1].teamName}
      </div>
      <div className="flex-row">
        <div className={`${color}`}>{mainStat.win ? 'WIN' : 'LOSE'}</div>
        <SummonerStat summonerData={mainStat} duration={matchData.duration} />
        {/* {matchData.summoners.map((s, i) => {
          return (
            <div key={i}>
              <ChampionIcon cid={s.cid} small />
              <span>{s.Summoner.name}</span>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};
