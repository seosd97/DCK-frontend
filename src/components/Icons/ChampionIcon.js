import React, { useContext } from 'react';
import { store } from '../../context/context';
import _ from 'underscore';
import '../../img.css';

const ChampionIcon = ({ cid, width, height }) => {
  const ctx = useContext(store);

  return (
    !ctx.isLoading && (
      // <div className="cui-icon-champion" style={{ width: width, height: height }}>
      <img
        src={`${process.env.REACT_APP_CDN_ENDPOINT}/${ctx.version}/img/champion/${ctx.championList[cid].image.full}`}
        alt="champion_icon"
        width="100%"
        height="100%"
      />
      // </div>
    )
  );
};

ChampionIcon.defaultProps = {
  cid: 0,
  width: '3rem',
  height: '3rem'
};

export default ChampionIcon;
