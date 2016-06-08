import React from 'react';

import {Navbar} from '../shared/components/navbar.component';
import styles from '../styles/main.css';

export class Main extends React.Component {
  render() {
    const links = [{
      name: 'Strona główna',
      path: '/'
    }, {
      name: 'Kalambury',
      path: '/puns'
    }, {
      name: 'Warcaby',
      path: '/checkers'
    }, {
      name: "Lobby",
      path: "/lobby"
    }];
    return (
      <div>
        <Navbar links={links} />
        <br />
        {this.props.children}
      </div>
    )
  }
}
