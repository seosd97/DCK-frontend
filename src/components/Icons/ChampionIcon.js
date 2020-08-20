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
    const roundClass = this.props.round ? 'img-round' : '';
    const size = this.props.size.split('x');
    return (
      <React.Fragment>
        {this.state.src && (
          <img
            src={this.state.src}
            alt="champion_icon"
            width={size[0]}
            height={size[1]}
            className={`common-icon-champ ${roundClass}`}
          />
        )}
      </React.Fragment>
    );
  }
}

ChampionIcon.defaultProps = {
  small: false,
  round: false
};

export default ChampionIcon;
