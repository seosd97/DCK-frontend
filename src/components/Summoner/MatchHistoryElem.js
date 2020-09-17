import React from 'react';
import Axios from 'axios';
import _ from 'underscore';

export default ({ matchData }) => {
  return (
    <div className="summoner-match-history-elem">
      {matchData.type} - {`round ${matchData.round}`}
    </div>
  );
};
