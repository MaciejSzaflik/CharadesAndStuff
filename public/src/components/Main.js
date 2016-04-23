import React from 'react'
import ReactDOM from 'react-dom';

import {Navbar} from './Navbar';

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
        <Navbar links={links}/>
        <div>Helolo from Main</div>
        {this.props.children}
      </div>
    )
  }
}