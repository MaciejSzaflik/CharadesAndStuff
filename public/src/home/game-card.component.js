import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardText,
  CardTitle, RaisedButton} from 'material-ui';
import {Link} from 'react-router';
import styles from './game-card.css';

export class GameCard extends React.Component {
  render() {
    const backgroundStyle = {
      background: `url('${this.props.image}') center / cover`
    };

    return (
      <div className="mdl-card">
        <div className="mdl-card__media">
          <Link to={this.props.link}>
            <div className={styles.gameCard__image} style={backgroundStyle}></div>
          </Link>
        </div>
        <div className="mdl-card__supporting-text">
          {this.props.description}
        </div>
        <div className="mdl-card__actions">
          <Link to={this.props.link}>
            <RaisedButton secondary={true} label="Zagraj" />
          </Link>
        </div>
      </div>
    )
  }
}