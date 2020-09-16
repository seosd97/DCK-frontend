import React from 'react';
import { Link } from 'react-router-dom';
import RoundButton from './ui/RoundButton';
import './Main.css';

class Main extends React.Component {
  render() {
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
              <h1 className="main-header">DCK</h1>
              <h2 className="sub-header">The League of Legends Tournament</h2>
            </div>
            <div className="flex-row flex-a-c flex-wrap width-100">
              <RoundButton to="/matches" desc="경기 결과" />
              <RoundButton to="/rankings" desc="소환사 기록" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Main;
