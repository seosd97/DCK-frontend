import React from 'react';
import './Header.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default () => {
  return (
    <header>
      <Router>
        <Link to="/">
          <img
            id="logo-img"
            src={process.env.PUBLIC_URL + '/dck_circle.png'}
            width="50"
            height="50"
          ></img>
        </Link>
      </Router>
    </header>
  );
};
