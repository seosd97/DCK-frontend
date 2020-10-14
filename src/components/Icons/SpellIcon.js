import React, { useContext } from 'react';
import { store } from '../../context/context';
import _ from 'underscore';
import '../../img.css';

const SpellIcon = ({ sid, width, height }) => {
  const ctx = useContext(store);

  return (
    !ctx.isLoading && (
      <div style={{ width: width, height: height }}>
        <img
          src={`${process.env.REACT_APP_CDN_ENDPOINT}/${ctx.version}/img/spell/${ctx.spellList[sid].image.full}`}
          alt="spell_img"
          className="spell-icon img-round"
          width="100%"
          height="100%"
        />
      </div>
    )
  );
};

SpellIcon.defaultProps = {
  sid: '0',
  width: '1.3rem',
  height: '1.3rem'
};

export default SpellIcon;
