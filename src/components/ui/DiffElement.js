import React from 'react';

const LeftElement = props => {
  return (
    <div
      className="flex-row flex-j-e flex-align-c text-align-right width-100"
      style={{ fontSize: '1em' }}
    >
      {props.children}
    </div>
  );
};

const RightElement = props => {
  return (
    <div className="flex-row flex-align-c text-align-left width-100" style={{ fontSize: '1em' }}>
      {props.children}
    </div>
  );
};

const findElement = (children, component) => {
  const type = component.displayName || component.name;
  for (let i in children) {
    if (type.includes(children[i].type.displayName || children[i].type.name)) {
      return children[i];
    }
  }

  return null;
};

const DiffElement = props => {
  return (
    <div className="cui-diff-elem flex-row flex-j-c width-100">
      {findElement(props.children, LeftElement)}
      <div className="text-align-center" style={descStyle}>
        {props.desc}
      </div>
      {findElement(props.children, RightElement)}
    </div>
  );
};

const descStyle = {
  fontSize: '1em',
  margin: '0 10px',
  padding: '5px 3px',
  minWidth: '100px',
  color: 'var(--white)',
  backgroundColor: 'var(--gray)',
  borderRadius: '4px'
};

DiffElement.LeftElement = LeftElement;
DiffElement.RightElement = RightElement;

export default DiffElement;
