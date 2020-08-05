import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <header>
      <Link className="logo-img" to="/">
        <img
          src={process.env.PUBLIC_URL + '/dck_logo_300.jpg'}
          alt="header_logo"
          width="70"
          height="70"
        ></img>
      </Link>
      <div className="flex-row flex-j-e flex-align-c width-100">
        <Link className="header-menu-item" to="/tournaments">
          대회 정보
        </Link>
        <Link className="header-menu-item" to="/rankings">
          소환사 정보
        </Link>
        {/* <Link id="register-icon" to="/register">
          대회 등록
        </Link> */}
      </div>
    </header>
  );
};
