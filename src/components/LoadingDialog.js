import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './LoadingDialog.css';

export default () => {
  return (
    <div className="loading-background">
      <CircularProgress />
    </div>
  );
};
