import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';

import {Main} from '../main';
import {Puns} from '../puns';
import {Checkers} from '../checkers';
import {Home} from '../home';
import {history, store} from '../root.store';
import {Lobby} from '../games/lobby';
import {Room} from '../games/room';

export let routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home} />
        <Route path="/puns" component={Puns} />
        <Route path="/checkers" component={Checkers} />
        <Route path="/lobby" component={Lobby} />
        <Route path="/room" component={Room} />
      </Route>
    </Router>
  </Provider>
);