import React from 'react';
import './Header.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddBoxOutlined';

export default () => {
  return (
    <header>
      <Router>
        <Link to="/" id="logo-img">
          <img src={process.env.PUBLIC_URL + '/dck_circle.png'} width="50" height="50"></img>
        </Link>
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/rankings">Ranking</Link>
        <Link to="/tournaments/new" id="add-icon">
          <AddIcon htmlColor="#E8EDDF" />
        </Link>
      </Router>
    </header>
  );
};
