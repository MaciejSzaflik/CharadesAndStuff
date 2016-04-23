import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {Main} from '../components/Main';
import {Home} from '../components/Home';

export let routes = (
  <Router>
    <Route path="/" component={Main}>
      <Route path="/home" component={Home}>
      </Route>
    </Route>
  </Router>
)