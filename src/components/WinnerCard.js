import React from 'react';
import Icon from '@material-ui/icons/EmojiEvents';
import { Card, CardContent } from '@material-ui/core';
import './WinnerCard.css';

export default props => {
  return (
    <Card className="root-card">
      <Icon htmlColor="#FFDF00" />
      <CardContent>{props.teamName}</CardContent>
    </Card>
  );
};
