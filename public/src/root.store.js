import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

import {rootReducer} from './root.reducer';


const defaultState = {
  home: {
    checkersDialog: {
      open: false
    },
    punsDialog: {
      open: false
    }
  },
  routing: {}
};

export let store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);