import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import MainLayout from './layout/MainLayout';
import './MatchList.css';

class MatchList extends React.Component {
  constructor() {
    super();

    this.state = {
      tournaments: []
    };
  }

  async componentDidMount() {
    const res = await Axios.get('http://localhost:8080/tournaments');
    this.setState({
      tournaments: res.data
    });
  }

  render() {
    const { tournaments } = this.state;
    return (
      <MainLayout>
        {!_.isEmpty(tournaments) ? (
          <div className="flex-col flex-j-c flex-align-c width-100">
            <select name="tournaments">
              {tournaments.map((t, i) => {
                return (
                  <option key={i} value={t.name}>
                    {t.name}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <div></div>
        )}
      </MainLayout>
    );
  }
}

export default MatchList;
