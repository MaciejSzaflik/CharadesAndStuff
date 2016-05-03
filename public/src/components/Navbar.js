import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

export class Navbar extends React.Component {
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Charades and Stuff</span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            {this.props.links.map((link) => (
              <Link to={link.path} className="mdl-navigation__link">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    )
  }
}