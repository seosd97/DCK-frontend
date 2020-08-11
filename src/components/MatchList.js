import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import MainLayout from './layout/MainLayout';
import MatchElement from './MatchElement';
import './MatchList.css';

import { Select } from 'antd';
const { Option } = Select;

class MatchList extends React.Component {
  constructor() {
    super();

    this.loadMatchList = this.loadMatchList.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);

    this.state = {
      tournaments: [],
      matches: [],
      filter: 'all'
    };
  }

  async componentDidMount() {
    const res = await Axios.get('http://localhost:8080/tournaments');
    this.setState({
      tournaments: res.data
    });

    this.loadMatchList(this.state.filter);
  }

  async loadMatchList(f) {
    let endpoint = 'http://localhost:8080/matches';
    if (f !== 'all') {
      endpoint = `${endpoint}?filter=${f}`;
    }

    console.log(f);
    const res = await Axios.get(endpoint);
    this.setState({
      matches: res.data
    });

    console.log(res.data);
  }

  onChangeFilter(v) {
    this.setState({
      filter: v
    });

    this.loadMatchList(v);
  }

  render() {
    const { tournaments, matches, filter } = this.state;
    return (
      <MainLayout>
        <div className="match-list-root flex-col flex-j-c flex-align-c width-100">
          <div className="tournament-filter flex-row flex-j-e flex-align-c width-100">
            <Select
              name="tournaments"
              value={filter}
              size="large"
              style={{
                width: '300px',
                fontSize: '1.2rem'
              }}
              onChange={this.onChangeFilter}
            >
              <Option value="all">모든 시즌</Option>
              {tournaments.map((t, i) => {
                return (
                  <Option key={i} value={t.name}>
                    {t.name}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="flex-col flex-j-c flex-align-c width-100">
            {!_.isEmpty(matches) ? (
              matches.map((m, i) => {
                return <MatchElement key={i} matchData={m} />;
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default MatchList;
