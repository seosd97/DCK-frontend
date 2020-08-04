import React from 'react';
import Axios from 'axios';
import _ from 'underscore';
import SummonerMatchCard from '../Match/SummonerMatchCard';

class SummonerMatchList extends React.Component {
  constructor() {
    super();

    this.state = {
      matches: []
    };
  }

  async componentDidMount() {
    try {
      const matches = await Axios.get(`http://localhost:8080/matches/summoner/${this.props.uuid}`);
      this.setState({
        matches: matches.data
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { matches } = this.state;
    return (
      <div>
        {!_.isEmpty(matches) &&
          matches.map((m, i) => {
            return <SummonerMatchCard key={i} matchData={m} uuid={this.props.uuid} />;
          })}
      </div>
    );
  }
}

export default SummonerMatchList;
