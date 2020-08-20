import React from 'react';

export default ({ src = '', width = 20, height = 20, desc = '', fontSize = '1em' }) => {
  const labelStyle = {
    fontSize: fontSize,
    paddingLeft: '5px'
  };
  return (
    <div className="cui-icon-label">
      <img src={src} alt="icon" width={width} height={height}></img>
      <label style={labelStyle}>{desc}</label>
    </div>
  );
};
