import React from 'react'
import ReactDOM from 'react-dom';
import {AppBar, Tabs, Tab} from 'material-ui';
import {Grid, Col, Row} from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Navbar} from './Navbar';
import styles from '../styles/main.css';

export const Main = function() {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AppBar title="Charades and Stuff"></AppBar>
    </MuiThemeProvider>
  )
};