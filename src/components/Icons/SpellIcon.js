import React, { useContext } from 'react';
import { store } from '../../context/context';
import _ from 'underscore';
import '../../img.css';

const SpellIcon = ({ sid, width, height }) => {
  const ctx = useContext(store);

  return (
    !ctx.isLoading && (
      <img
        src={`${process.env.REACT_APP_CDN_ENDPOINT}/${ctx.version}/img/spell/${ctx.spellList[sid].image.full}`}
        alt="spell_img"
        className="spell-icon img-round"
        width={width}
        height={height}
      />
    )
  );
};

SpellIcon.defaultProps = {
  sid: '0',
  width: '20px',
  height: '20px'
};

export default SpellIcon;
