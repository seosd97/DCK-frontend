import React, { useContext } from 'react';
import { store } from '../../context/context';
import '../../img.css';

const ItemIcon = ({ iid, width, height }) => {
  const ctx = useContext(store);

  return !ctx.isLoading && iid > 0 ? (
    // <div style={{ width: width, height: height }}>
    <img
      src={`${process.env.REACT_APP_CDN_ENDPOINT}/${ctx.version}/img/item/${iid}.png`}
      alt="item_img"
      className="item-icon"
      width="100%"
      height="100%"
    />
  ) : (
    // </div>
    <div className="item-icon" style={{ backgroundColor: '#3b3c40' }}></div>
  );
};

ItemIcon.defaultProps = {
  width: '1.5rem',
  height: '1.5rem'
};

export default ItemIcon;
