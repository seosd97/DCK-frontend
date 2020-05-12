import React from 'react';
import { Link } from 'react-router-dom';
import './MenuCard.css';

export default props => {
  return (
    <Link to={props.path} id="menu-card">
      <div id="card-title">{props.title}</div>
      <p id="card-content">{props.content}</p>
    </Link>
  );
};
