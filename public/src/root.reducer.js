import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {home} from './home/home.reducer';


export const rootReducer = combineReducers({
  home: home,
  routing: routerReducer
});