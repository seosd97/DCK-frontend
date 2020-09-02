import React from 'react';
import * as DDragon from '../../api/data-dragon';
import '../../img.css';

class ChampionIcon extends React.Component {
  constructor() {
    super();

    this.state = {
      src: '',
      endpoion: ''
    };
  }

  async componentDidMount() {
    const path = await this.loadIconURL(this.props.cid);
    const version = await DDragon.getVersion();

    this.setState({
      src: `${path}`,
      endpoion: `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion`
    });
  }

  async componentDidUpdate() {
    const path = await this.loadIconURL(this.props.cid);

    if (this.state.src === path) {
      return;
    }

    this.setState({
      src: path
    });
  }

  async loadIconURL() {
    const { cid } = this.props;
    if (cid === 0) {
      return;
    }

    const champion = await DDragon.getChampionByKey(cid);

    return champion.image.full;
  }

  render() {
    const { size } = this.props;
    let iconSize = null;
    if (size !== '') {
      iconSize = size.split('x');
    }

    return (
      <React.Fragment>
        {this.state.src && (
          <img
            src={`${this.state.endpoion}/${this.state.src}`}
            alt="champion_icon"
            className="cui-icon-champion"
            style={iconSize && { width: `${iconSize[0]}px`, height: `${iconSize[0]}px` }}
          />
        )}
      </React.Fragment>
    );
  }
}

ChampionIcon.defaultProps = {
  cid: 0,
  small: false,
  round: false,
  size: ''
};

export default ChampionIcon;
