import React from 'react';
import * as DDragon from '../../api/data-dragon';
import '../../img.css';

class RuneIcon extends React.Component {
  constructor() {
    super();

    this.state = {
      isStone: true,
      src: ''
    };
  }

  componentDidMount() {
    DDragon.getRuneByID(this.props.styleId).then(d => {
      if (this.props.rid === undefined) {
        this.setState({
          src: `https://ddragon.leagueoflegends.com/cdn/img/${d.icon}`
        });

        return;
      }

      const runes = d.slots[0].runes;
      for (let i in runes) {
        const rune = runes[i];
        if (rune.id === this.props.rid) {
          this.setState({
            isStone: false,
            src: `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`
          });
          break;
        }
      }
    });
  }

  // componentDidUpdate() {
  //   DDragon.getRuneByID(this.props.styleId).then(d => {
  //     if (this.props.rid === undefined) {
  //       this.setState({
  //         src: `https://ddragon.leagueoflegends.com/cdn/img/${d.icon}`
  //       });

  //       return;
  //     }

  //     const runes = d.slots[0].runes;
  //     for (let i in runes) {
  //       const rune = runes[i];
  //       if (rune.id === this.props.rid) {
  //         this.setState({
  //           isStone: false,
  //           src: `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`
  //         });
  //         break;
  //       }
  //     }
  //   });
  // }

  render() {
    return (
      <React.Fragment>
        {this.state.src && (
          <img
            src={this.state.src}
            alt="rune_image"
            className={`${this.state.isStone ? 'keystone' : 'mainrune'} img-round`}
            width={this.props.width}
            height={this.props.height}
          />
        )}
      </React.Fragment>
    );
  }
}

RuneIcon.defaultProps = {
  width: '20px',
  height: '20px'
};

export default RuneIcon;
