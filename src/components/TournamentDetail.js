import React from 'react';
import Axios from 'axios';
import _ from 'underscore';
import MainLayout from './layout/MainLayout';
import MatchElement from './MatchElement';
import './TournamentDetail.css';

class TournamentDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      tournamentData: {}
    };
  }

  componentDidMount() {
    // Axios.get(`http://localhost:8080/matches/by_tournament/${this.props.match.params.id}`)
    //   .then(res => {
    //     this.setState({
    //       tournamentData: res.data
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  render() {
    const { tournamentData } = this.state;
    {
      console.log(tournamentData);
    }
    return (
      <MainLayout>
        {!_.isEmpty(tournamentData) ? (
          <div>
            {tournamentData.map((m, i) => {
              return <MatchElement key={i} matchData={m} />;
            })}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </MainLayout>
    );
  }
}

export default TournamentDetail;
