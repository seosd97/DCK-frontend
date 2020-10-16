import React from 'react';

export default ({ src = '', width = 15, height = 15, desc = '', fontSize = '1em' }) => {
  const labelStyle = {
    fontSize: fontSize,
    lineHeight: fontSize,
    paddingLeft: '2px'
  };
  return (
    <div className="cui-icon-label flex-row flex-align-c">
      <img src={src} alt="icon" width={width} height={height}></img>
      <span style={labelStyle}>{desc}</span>
    </div>
  );
};
