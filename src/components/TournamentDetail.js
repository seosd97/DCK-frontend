import React from 'react';
import Axios from 'axios';
import _ from 'underscore';
import MatchCard from './TournamentMatchCard';
import './TournamentDetail.css';

class TournamentDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      tournamentName: '',
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
          tournamentName: res.data.name,
          groupStageMatches: matches.filter(i => i.type === 'groupstage'),
          semiFinalMatches: matches.filter(i => i.type === 'semifinal'),
          finalMatches: matches.filter(i => i.type === 'final')
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { tournamentName, groupStageMatches, semiFinalMatches, finalMatches } = this.state;
    return (
      <div>
        <h1>{tournamentName}</h1>
        {!_.isEmpty(finalMatches) && (
          <div className="match-container">
            <h2>Final</h2>
            <MatchCard matchType="final" matches={finalMatches} />
          </div>
        )}
        {!_.isEmpty(semiFinalMatches) && (
          <div className="match-container">
            <h2>Semi Final</h2>
            <MatchCard matchType="semifinal" matches={semiFinalMatches} />
          </div>
        )}
        {!_.isEmpty(groupStageMatches) && (
          <div className="match-container">
            <h2>Group Stage</h2>
            <MatchCard matchType="groupstage" matches={groupStageMatches} />
          </div>
        )}
      </div>
    );
  }
}

export default TournamentDetail;
