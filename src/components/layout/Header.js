import React from 'react';
import './Header.css';

export default () => {
  return (
    <header>
      <img
        id="logo-img"
        src={process.env.PUBLIC_URL + '/dck_circle.png'}
        width="50"
        height="50"
      ></img>
    </header>
  );
};
