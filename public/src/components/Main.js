import React from 'react'
import ReactDOM from 'react-dom';
import {AppBar, Tabs, Tab} from 'material-ui';
import {Grid, Col, Row} from 'react-flexbox-grid';

import {Navbar} from './Navbar';
import styles from '../styles/main.css';

export class Main extends React.Component {
  render() {
    let links = [{
      path: '/',
      name: 'Main'
    }, {
      path: '/home',
      name: 'Home'
    }];
    return (
      <div>
        <AppBar title="Charades and Stuff"></AppBar>
        <Grid>
          <Row>
          </Row>
        </Grid>
      </div>
    )
  }
}