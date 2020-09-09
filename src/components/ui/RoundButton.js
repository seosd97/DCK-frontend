import React from 'react';
import { Link } from 'react-router-dom';
import './RoundButton.css';

export default ({ to, desc }) => {
  return (
    <Link to={to} className="cui-round-btn">
      {desc}
    </Link>
  );
};
