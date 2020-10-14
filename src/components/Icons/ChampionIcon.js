import React, { useContext } from 'react';
import { store } from '../../context/context';
import _ from 'underscore';
import '../../img.css';

const ChampionIcon = ({ cid, width, height }) => {
  const ctx = useContext(store);

  return (
    !ctx.isLoading && (
      <img
        src={`${process.env.REACT_APP_CDN_ENDPOINT}/${ctx.version}/img/champion/${ctx.championList[cid].image.full}`}
        alt="champion_icon"
        className="cui-icon-champion"
        width={width}
        height={height}
      />
    )
  );
};

ChampionIcon.defaultProps = {
  cid: 0,
  width: '40px',
  height: '40px'
};

export default ChampionIcon;
