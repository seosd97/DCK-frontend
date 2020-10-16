import React from 'react';
import Axios from 'axios';
import _ from 'underscore';
import './RegisterMatch.css';

class RegisterMatch extends React.Component {
  constructor() {
    super();

    this.state = {
      matchData: {}
    };

    this.input = React.createRef();
  }

  LoadMatchData(e) {
    e.preventDefault();

    const { matchData } = this.state;

    const id = Number(this.input.current.value);
    if (!_.isEmpty(this.state.matchData) && matchData.gameId === id) {
      return;
    }

    Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/riotapi/match/${id}`)
      .then(res => {
        this.setState({
          matchData: JSON.parse(res.data)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div id="match-register-container">
        <div id="match-input-area"></div>
      </div>
    );
  }
}

export default RegisterMatch;
