import React from 'react';
import _ from 'underscore';
import * as DDragon from '../../api/data-dragon';

class ProfileIcon extends React.Component {
  constructor() {
    super();

    this.state = {
      src: ''
    };
  }

  async componentDidMount() {
    try {
      const version = await DDragon.getVersion();
      this.setState({
        src: `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${this.props.iconId}.png`
      });
    } catch (err) {
      console.log(err);
    }
  }

  // TODO : 수정 예정
  async componentDidUpdate() {
    const version = await DDragon.getVersion();

    if (
      this.state.src ===
      `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${this.props.iconId}.png`
    ) {
      return;
    }

    this.setState({
      src: `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${this.props.iconId}.png`
    });
  }

  render() {
    return (
      <React.Fragment>
        <img
          src={this.state.src}
          alt={`${this.props.iconId}.png`}
          className="img-120x120 img-round"
        ></img>
      </React.Fragment>
    );
  }
}

export default ProfileIcon;
