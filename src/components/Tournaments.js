import React from 'react';
import './Tournaments.css';
import Axios from 'axios';
import TournamentInfo from './TournamentInfo';

class Tournaments extends React.Component {
  constructor() {
    super();

    this.state = {
      status: 'pending',
      tournamentList: []
    };
  }

  componentDidMount() {
    Axios.get('http://localhost:8080/tournaments')
      .then(res => {
        this.setState({ status: 'success', tournamentList: res.data });
      })
      .catch(err => {
        this.setState({
          status: 'failed',
          tournamentList: [err]
        });
      });
  }

  render() {
    return (
      <section id="tournaments-container">
        {this.state.tournamentList.map(t => {
          return <TournamentInfo key={t.id} name={t.name} />;
        })}
      </section>
    );
  }
}

export default Tournaments;
