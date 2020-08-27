import React from 'react';

export default ({ src = '', width = 20, height = 20, desc = '', fontSize = '1em' }) => {
  const labelStyle = {
    fontSize: fontSize,
    lineHeight: fontSize,
    paddingLeft: '4px'
  };
  return (
    <div className="cui-icon-label flex-row flex-align-c">
      <img src={src} alt="icon" width={width} height={height}></img>
      <span style={labelStyle}>{desc}</span>
    </div>
  );
};
