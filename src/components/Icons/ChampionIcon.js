import React from 'react';
import * as DDragon from '../../api/data-dragon';
import '../../img.css';

class ChampionIcon extends React.Component {
  constructor() {
    super();

    this.state = {
      src: ''
    };
  }

  async componentDidMount() {
    const champion = await DDragon.getChampionByKey(this.props.cid);

    this.setState({
      src: `http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${champion.image.full}`
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.src && (
          <img src={this.state.src} alt="champion_img" className="img-40x40 img-round" />
        )}
      </React.Fragment>
    );
  }
}

export default ChampionIcon;
