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

  componentDidMount() {
    DDragon.getChampionByKey(this.props.cid).then(d => {
      this.setState({
        src: `http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${d.image.full}`
      });
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
