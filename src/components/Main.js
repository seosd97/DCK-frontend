import React from 'react';
import './Main.css';

class Main extends React.Component {
  render() {
    return (
      <div className="main-root">
        <div className="back-img"></div>
        <div className="main-title flex-col flex-align-c flex-j-c width-100">
          <img
            src={process.env.PUBLIC_URL + '/dck_circle.png'}
            alt="logo-circle"
            width="130"
            height="130"
          ></img>
          <h1>LOL Champions</h1>
          <h2>Korea</h2>
        </div>
        <div className="main-info-container"></div>
      </div>
    );
  }
}

export default Main;
