import React from 'react';
import Axios from 'axios';
import TournamentElement from './TournamentElement';
import MainLayout from './layout/MainLayout';
import './TournamentList.css';

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
      <MainLayout>
        <section className="tournament-desc-section width-100">
          <div className="black-layer">
            <h1 className="tournament-main-header">DCK TOURNAMENTS</h1>
          </div>
        </section>
        <section className="tournament-container flex-col flex-align-c width-100 m-w-auto">
          <h2 className="tournament-container-header">LAST TOURNAMENTS</h2>
          {this.state.tournamentList.map((t, i) => {
            return <TournamentElement key={i} tournamentData={t} />;
          })}
        </section>
      </MainLayout>
    );
  }
}

export default Tournaments;
