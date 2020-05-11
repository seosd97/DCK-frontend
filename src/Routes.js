import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import Tournaments from './components/Tournaments';
import Ranking from './components/Ranking';

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/tournaments" component={Tournaments} />
      <Route path="/rankings" component={Ranking} />
    </Switch>
  );
};
