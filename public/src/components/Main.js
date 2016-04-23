import React from 'react'
import ReactDOM from 'react-dom';

export class Main extends React.Component {
  render() {
    return (
      <div>
        <div>Helolo from Main</div>
        {this.props.children}
      </div>
    )
  }
}