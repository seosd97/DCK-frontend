import React from 'react';
import * as DDragon from '../../api/data-dragon';
import '../../img.css';

class SpellIcon extends React.Component {
  constructor() {
    super();

    this.state = {
      src: ''
    };
  }

  componentDidMount() {
    DDragon.getSpellByID(this.props.sid).then(d => {
      this.setState({
        src: `http://ddragon.leagueoflegends.com/cdn/10.11.1/img/spell/${d.image.full}`
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.src && (
          <img src={this.state.src} alt="spell_img" className="spell-icon img-round img-20x20" />
        )}
      </React.Fragment>
    );
  }
}

export default SpellIcon;
