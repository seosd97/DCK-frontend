import React, { useContext } from 'react';
import { store } from '../../context/context';
import _ from 'underscore';

const ProfileIcon = ({ iconId, width, height }) => {
  const ctx = useContext(store);

  return (
    !ctx.isLoading && (
      <div style={{ width: width, height: height }}>
        <img
          src={`${process.env.REACT_APP_CDN_ENDPOINT}/${ctx.version}/img/profileicon/${iconId}.png`}
          alt={`${iconId}.png`}
          className="profile-icon img-round"
          width="100%"
          height="100%"
        ></img>
      </div>
    )
  );
};

ProfileIcon.defaultProps = {
  width: '6rem',
  height: '6rem'
};

export default ProfileIcon;
