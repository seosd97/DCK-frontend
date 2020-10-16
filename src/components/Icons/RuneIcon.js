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
    // <div style={{ width: width, height: height }}>
    <img
      src={`${process.env.REACT_APP_CDN_ENDPOINT}/img/${!_.isEmpty(runeData) && runeData.icon}`}
      alt="rune_img"
      // className="rune-icon"
      width="100%"
      height="100%"
    />
    // </div>
  );
};

RuneIcon.defaultProps = {
  width: '1.3rem',
  height: '1.3rem'
};

export default RuneIcon;
