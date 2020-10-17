import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import _ from 'underscore';
import MainLayout from './layout/MainLayout';
import MatchElement from './MatchElement';
import './MatchList.css';

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
    const res = await Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/tournaments`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    this.setState({
      tournaments: res.data
    });

    this.loadMatchList(this.state.filter);
  }

  async loadMatchList(f) {
    let endpoint = `${process.env.REACT_APP_API_ENDPOINT}/matches`;
    if (f !== 'all') {
      endpoint = `${endpoint}?filter=${f}`;
    }

    const res = await Axios.get(endpoint, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    this.setState({
      matches: res.data
    });
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
            {/* <Select
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
            </Select> */}
          </div>
          <div className="flex-col flex-align-c width-100">
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
