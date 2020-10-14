import React, { useContext } from 'react';
import { store } from '../../context/context';
import _ from 'underscore';
import '../../img.css';

const RuneIcon = ({ styleId, rid, width, height }) => {
  const ctx = useContext(store);

  const runeData =
    !ctx.isLoading &&
    (rid === undefined
      ? ctx.runeList[styleId]
      : ctx.runeList[styleId].slots[0].runes.find(r => r.id === rid));

  return (
    <img
      src={`${process.env.REACT_APP_CDN_ENDPOINT}/img/${!_.isEmpty(runeData) && runeData.icon}`}
      alt="rune_img"
      className="rune-icon img-round"
      width={width}
      height={height}
    />
  );
};

RuneIcon.defaultProps = {
  width: '20px',
  height: '20px'
};

export default RuneIcon;
