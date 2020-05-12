import React from 'react';
import MenuCard from '../MenuCard';
import './Register.css';

export default () => {
  return (
    <div id="register-menu-container">
      <MenuCard path="/register/tournament" title="Register Tournament" />
      <MenuCard path="/register/match" title="Register Match" />
      <MenuCard path="/register/team" title="Register Team" />
      <MenuCard path="/register/summoner" title="Register Summoner" />
    </div>
  );
};
