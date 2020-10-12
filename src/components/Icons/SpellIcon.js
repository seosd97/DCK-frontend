import React, { useContext } from 'react';
import * as DDragon from '../../api/data-dragon';
// import { store } from '../../context/context';
import '../../img.css';

const SpellIcon = ({ width, height }) => {
  return (
    <img
      src={`http://ddragon.leagueoflegends.com/cdn/${global.version}/img/spell/SummonerBarrier.png`}
      alt="spell_img"
      className="spell-icon img-round"
      width={width}
      height={height}
    />
  );
};

// class SpellIcon extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       src: ''
//     };
//   }

//   async componentDidMount() {
//     const ver = await DDragon.getVersion();
//     DDragon.getSpellByID(this.props.sid).then(d => {
//       this.setState({
//         src: `http://ddragon.leagueoflegends.com/cdn/10.11.1/img/spell/${d.image.full}`
//       });
//     });
//   }

//   // componentDidUpdate() {
//   //   DDragon.getSpellByID(this.props.sid).then(d => {
//   //     this.setState({
//   //       src: `http://ddragon.leagueoflegends.com/cdn/10.11.1/img/spell/${d.image.full}`
//   //     });
//   //   });
//   // }

//   render() {
//     return (
//       <React.Fragment>
//         {this.state.src && (
//           <img
//             src={this.state.src}
//             alt="spell_img"
//             className="spell-icon img-round"
//             width={this.props.width}
//             height={this.props.height}
//           />
//         )}
//       </React.Fragment>
//     );
//   }
// }

SpellIcon.defaultProps = {
  width: '20px',
  height: '20px'
};

export default SpellIcon;
