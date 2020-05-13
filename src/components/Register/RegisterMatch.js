import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import _ from 'underscore';
import './RegisterMatch.css';

const TextInput = withStyles({
  root: {
    margin: '10px',
    width: 500,
    color: '#333533',
    '& label.Mui-focused': {
      color: '#333533'
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#333533'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#333533'
    },
    '& .MuiInput-underline:hover:not(Mui-disabled)::before': {
      borderBottomColor: '#333533'
    },
    '& input[type="text"]': {
      fontSize: '1.1rem'
    }
  }
})(TextField);

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

    //if (!_.isEmpty(this.state.matchData) && matchData.id == )

    const id = Number(this.input.current.value);
    Axios.get(`http://localhost:8080/riotapi/match/${id}`)
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
        <div>
          <TextInput id="match-id-field" label="match id" inputRef={this.input} />
          <Button id="load-btn" variant="contained" onClick={this.LoadMatchData.bind(this)}>
            Load
          </Button>
        </div>
        {!_.isEmpty(this.state.matchData) && <div>{this.state.matchData.platformId}</div>}
      </div>
    );
  }
}

export default RegisterMatch;
