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
      // const version = await DDragon.getVersion();
      this.setState({
        src: `http://ddragon.leagueoflegends.com/cdn/10.19.1/img/item/${this.props.iid}.png`
      });
    }
  }

  // async componentDidUpdate() {
  //   if (this.props.iid > 0) {
  //     const version = await DDragon.getVersion();
  //     this.setState({
  //       src: `http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${this.props.iid}.png`
  //     });
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        {this.state.src ? (
          <img
            src={this.state.src}
            alt="item_img"
            className="item-icon"
            width={this.props.width}
            height={this.props.height}
          />
        ) : (
          <div className="item-icon" style={{ backgroundColor: '#3b3c40' }}></div>
        )}
      </React.Fragment>
    );
  }
}

ItemIcon.defaultProps = {
  width: '25px',
  height: '25px'
};

export default ItemIcon;
