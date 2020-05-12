import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddToPhotos';

export default () => {
  return (
    <header>
      <Link to="/" id="logo-img">
        <img src={process.env.PUBLIC_URL + '/dck_circle.png'} width="50" height="50"></img>
      </Link>
      <Link className="header-menu" to="/tournaments">
        Tournaments
      </Link>
      <Link className="header-menu" to="/rankings">
        Ranking
      </Link>
      <Link to="/register" id="add-icon">
        <AddIcon />
      </Link>
    </header>
  );
};
