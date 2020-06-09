import React from 'react';
import * as DDragon from '../../api/data-dragon';
import '../../img.css';

class ItemIcon extends React.Component {
  constructor() {
    super();

    this.state = {
      src: ''
    };
  }

  async componentDidMount() {
    if (this.props.iid > 0) {
      const version = await DDragon.getVersion();
      this.setState({
        src: `http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${this.props.iid}.png`
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.src && (
          <img src={this.state.src} alt="item_img" className="item-icon img-20x20" />
        )}
      </React.Fragment>
    );
  }
}

export default ItemIcon;
