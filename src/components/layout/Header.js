import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddToPhotos';

export default () => {
  return (
    <header>
      <Link id="logo-img" to="/">
        <img
          src={process.env.PUBLIC_URL + '/dck_circle.png'}
          alt="header_logo"
          width="50"
          height="50"
        ></img>
      </Link>
      <div className="header-menu">
        <Link className="header-menu-item" to="/tournaments">
          Tournaments
        </Link>
        <Link className="header-menu-item" to="/rankings">
          Ranking
        </Link>
        <Link id="register-icon" to="/register">
          <AddIcon />
        </Link>
      </div>
    </header>
  );
};
