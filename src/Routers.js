import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import TournamentList from './components/TournamentList';
import TournamentDetail from './components/TournamentDetail';
import Ranking from './components/Ranking';

import TeamDetail from './components/Team/TeamDetail';

import SummonerDetail from './components/Summoner/SummonerDetail';

import MatchList from './components/MatchList';
import MatchDetail from './components/MatchDetail';

import Register from './components/Register/Register';
import RegTournament from './components/Register/RegisterTournament';
import RegMatch from './components/Register/RegisterMatch';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      {/* <Route exact path="/tournaments" component={TournamentList} /> */}
      {/* <Route exact path="/tournaments/:id" component={TournamentDetail} /> */}

      <Route exact path="/teams/:name" component={TeamDetail} />

      <Route exact path="/summoners/:name" component={SummonerDetail} />

      <Route exact path="/matches" component={MatchList} />
      <Route exact path="/matches/:id" component={MatchDetail} />

      <Route exact path="/register" component={Register} />
      <Route path="/register/tournament" component={RegTournament} />
      <Route path="/register/match" component={RegMatch} />
      <Route path="/register/team" component={Register} />
      <Route path="/register/summoner" component={Register} />

      <Route path="/rankings" component={Ranking} />
    </Switch>
  );
};
