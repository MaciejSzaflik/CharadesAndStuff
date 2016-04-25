import React from 'react'
import ReactDOM from 'react-dom';

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
      <div className="mdl-layout mdl-js-layout">
        <Navbar links={links}/>
        <main className="mdl-layout__content">
          <div className={styles.contentMaxWidth}>
            <div className="mdl-grid content-max-width">
              <div className="mdl-cell">
                {this.props.children}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}