import React, { useContext } from 'react';
import * as DDragon from '../../api/data-dragon';
import '../../img.css';
import { store } from '../../context/context';

const ChampionIcon = ({ cid, width, height }) => {
  const ctx = useContext(store);

  return (
    <img
      src={`${process.env.REACT_APP_CDN_ENDPOINT}/${ctx.version}/img/champion/${ctx.championList[cid].image.full}`}
      alt="champion_icon"
      className="cui-icon-champion"
      width={width}
      height={height}
    />
  );
};

ChampionIcon.defaultProps = {
  cid: 0,
  width: '40px',
  height: '40px'
};

export default ChampionIcon;
