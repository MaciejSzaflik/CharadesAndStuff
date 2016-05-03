import React from 'react'
import ReactDOM from 'react-dom';
import {AppBar, Tabs, Tab, RaisedButton} from 'material-ui';
import {Grid, Col, Row} from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Navbar} from './Navbar';
import styles from '../styles/main.css';

export class Main extends React.Component {
  render() {
    const links = [{
      name: 'Main',
      path: '/'
    }, {
      name: 'Home',
      path: '/home'
    }]
    return (
      <div>
        <Navbar links={links} />
        <br />
        {this.props.children}
      </div>
    )
  }
}
