import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {Main} from '../main';
import {Puns} from '../puns';
import {Checkers} from '../checkers';
import {Home} from '../home';

export let routes = (
  <Router>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="/puns" component={Puns} />
      <Route path="/checkers" component={Checkers} />
    </Route>
  </Router>
)