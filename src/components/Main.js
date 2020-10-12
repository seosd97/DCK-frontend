import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChampionIcon from './Icons/ChampionIcon';
import './Main.css';

export default () => {
  return (
    <section className="main-root">
      <div className="black-layer">
        <div className="main-info-container flex-col width-100">
          <img
            className="main-logo"
            src={`${process.env.PUBLIC_URL}/dck_logo_300.jpg`}
            alt="logo_300"
            width="100"
            height="100"
          ></img>
          <div className="main-title">
            <h1>DCK</h1>
            <h2>The our own League of Legends tournament</h2>
          </div>
          <div className="flex-row flex-a-c flex-wrap width-100">
            <Link to="/matches" className="content-button">
              경기 결과
            </Link>
            <Link to="/rankings" className="content-button">
              소환사 기록
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
