import React from 'react';
import Axios from 'axios';
import _ from 'underscore';
import MatchCard from './TournamentMatchCard';
import './TournamentDetail.css';

class TournamentDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      groupStageMatches: [],
      semiFinalMatches: [],
      fianlMatches: []
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:8080/tournament/${this.props.match.params.id}`)
      .then(res => {
        const matches = res.data.matches;

        this.setState({
          groupStageMatches: matches.filter(i => i.type === 'groupstage'),
          semiFinalMatches: matches.filter(i => i.type === 'semifinal'),
          fianlMatches: matches.filter(i => i.type === 'finale')
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { groupStageMatches, semiFinalMatches, fianlMatches } = this.state;
    return (
      <div>
        {!_.isEmpty(groupStageMatches) ? (
          <MatchCard matchType="groupstage" matches={groupStageMatches} />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

export default TournamentDetail;
