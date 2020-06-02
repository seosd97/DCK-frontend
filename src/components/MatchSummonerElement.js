import React from 'react';
import * as DDragon from '../api/data-dragon';

class MatchSummonerInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      portrait: ''
    };
  }

  componentDidMount() {
    DDragon.getChampionByKey(this.props.data.cid).then(d => {
      console.log(d);
      this.setState({
        portrait: `http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${d.image.full}`
      });
    });
  }

  render() {
    return (
      <div>
        <img src={this.state.portrait} alt="img"></img>
      </div>
    );
  }
}

export default MatchSummonerInfo;
