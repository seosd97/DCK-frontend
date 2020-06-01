import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './MatchInfo.css';

export default props => {
  return (
    <div id="match-info-root">
      <div>
        GAMETIME{' '}
        <Moment unix format="mm:ss">
          {props.matchData.duration}
        </Moment>
      </div>
    </div>
  );
};
