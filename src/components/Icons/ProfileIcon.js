import React, { useContext } from 'react';
import { store } from '../../context/context';
import _ from 'underscore';

const ProfileIcon = ({ iconId, width, height }) => {
  const ctx = useContext(store);

  return (
    !ctx.isLoading && (
      <img
        src={`${process.env.REACT_APP_CDN_ENDPOINT}/${ctx.version}/img/profileicon/${iconId}.png`}
        alt={`${iconId}.png`}
        className="profile-icon img-round"
        width={width}
        height={height}
      ></img>
    )
  );
};

ProfileIcon.defaultProps = {
  width: '120px',
  height: '120px'
};

export default ProfileIcon;
