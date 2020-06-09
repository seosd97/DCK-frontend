import React from 'react';
import Moment from 'react-moment';

export default props => {
  const format = props.format || '';
  const duration = props.duration || 0;

  return (
    <Moment unix format={format}>
      {duration}
    </Moment>
  );
};
