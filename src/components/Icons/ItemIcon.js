import React, { useContext } from 'react';
import { store } from '../../context/context';
import '../../img.css';

const ItemIcon = ({ iid, width, height }) => {
  const ctx = useContext(store);

  return !ctx.isLoading && iid > 0 ? (
    <img
      src={`${process.env.REACT_APP_CDN_ENDPOINT}/${ctx.version}/img/item/${iid}.png`}
      alt="item_img"
      className="item-icon"
      width={width}
      height={height}
    />
  ) : (
    <div className="item-icon" style={{ backgroundColor: '#3b3c40' }}></div>
  );
};

ItemIcon.defaultProps = {
  width: '25px',
  height: '25px'
};

export default ItemIcon;
