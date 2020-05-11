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
      <Link to="/tournaments">Tournaments</Link>
      <Link to="/rankings">Ranking</Link>
      <Link to="/tournaments/new" id="add-icon">
        <AddIcon htmlColor="#E8EDDF" />
      </Link>
    </header>
  );
};
