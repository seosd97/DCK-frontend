import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import Tournaments from './components/Tournaments';
import Ranking from './components/Ranking';
import Register from './components/Register/Register';
import RegTournament from './components/Register/RegisterTournament';
import RegMatch from './components/Register/RegisterMatch';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/tournaments" component={Tournaments} />
      <Route exact path="/register" component={Register} />
      <Route path="/register/tournament" component={RegTournament} />
      <Route path="/register/match" component={RegMatch} />
      <Route path="/register/team" component={Register} />
      <Route path="/register/summoner" component={Register} />
      <Route path="/rankings" component={Ranking} />
    </Switch>
  );
};
