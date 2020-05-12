import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
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

const LoadMatchData = e => {
  e.preventDefault();
};

export default () => {
  return (
    <div id="match-register-container">
      <div>
        <TextInput id="match-id-field" label="match id" />
        <Button id="load-btn" variant="contained" onClick={LoadMatchData}>
          Load
        </Button>
      </div>
    </div>
  );
};
