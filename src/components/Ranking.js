import React from 'react';
import MainLayout from './layout/MainLayout';
import Axios from 'axios';
import _ from 'underscore';
import './Ranking.css';
import RankingElem from './RankingElem';

const rankCols = [
  { name: '경기 수', key: 'games' },
  { name: '승', key: 'wins' },
  { name: '패', key: 'defeats' },
  { name: '승률', key: 'winrate' },
  { name: 'KDA', key: 'kda' }
];

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      statData: [],
      sortKey: 'games'
    };

    this.onClickTab = this.onClickTab.bind(this);
  }

  async componentDidMount() {
    const stats = await Axios.get('http://localhost:8080/ranking');

    this.setState({
      statData: stats.data
    });
  }

  calcSortValue(data, key) {
    if (data === undefined || key === '') {
      return;
    }

    if (key === 'winrate') {
      return (data.wins / data.games) * 100;
    }

    if (key === 'kda') {
      return (data.kills + data.assists) / data.deaths;
    }

    return data[key];
  }

  sortRankingList(dataList, sortKey) {
    let prevValue = null;
    let sortedData = dataList.slice();
    sortedData.sort((a, b) => {
      return this.calcSortValue(b, sortKey) - this.calcSortValue(a, sortKey);
    });

    sortedData.forEach((s, i) => {
      if (prevValue !== null && prevValue === this.calcSortValue(s, sortKey)) {
        s.rank = sortedData[i - 1].rank;
        return;
      }

      prevValue = this.calcSortValue(s, sortKey);
      s.rank = i + 1;
    });

    return sortedData;
  }

  onClickTab(e) {
    const selectKey = e.target.dataset.key;
    if (selectKey === this.state.sortKey) {
      return;
    }

    this.setState({
      sortKey: selectKey
    });
  }

  render() {
    const { statData, sortKey } = this.state;
    const sortedData = this.sortRankingList(statData, sortKey);

    return (
      <MainLayout>
        <div className="summoner-ranking-root flex-col flex-j-c">
          <div className="rank-col-tab flex-row flex-j-a flex-align-c width-100">
            {rankCols.map((e, i) => {
              return (
                <div
                  key={i}
                  className={'tab-elem' + (sortKey === e.key ? ' selected' : '')}
                  data-key={e.key}
                  onClick={this.onClickTab}
                >
                  {e.name}
                </div>
              );
            })}
          </div>
          {!_.isEmpty(sortedData) && (
            <div className="summoner-ranking-list flex-col flex-align-c">
              {sortedData.map((s, i) => {
                return <RankingElem key={i} statData={s} rank={s.rank} />;
              })}
            </div>
          )}
        </div>
      </MainLayout>
    );
  }
}

export default Ranking;
