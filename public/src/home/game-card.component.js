import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardText,
  CardTitle, RaisedButton} from 'material-ui';
import {Link} from 'react-router';
import styles from './game-card.css';

const PropTypes = React.PropTypes;

const props = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func
};

export const GameCard = function({title, description, link, image, onClick}) {
  const backgroundStyle = {
    background: `url('${image}') center / cover`,
    cursor: 'pointer'
  }
  return (
    <div className="mdl-card mdl-shadow--2dp">
      <div className="mdl-card__media" onClick={onClick} style={backgroundStyle}>
        <div className={styles.gameCard__image}>
          <div className={styles.gameCard__imageOverlay}>
            <h2 className={styles.gameCard__titleText}>{title}</h2>
          </div>
        </div>
      </div>
      <div className="mdl-card__supporting-text">
        {description}
      </div>
      <div className="mdl-card__actions">
        <Link to={link}>
          <RaisedButton secondary={true} label="Zagraj" />
        </Link>
      </div>
    </div>
  )

};

//export class GameCard extends React.Component {
//  render() {
//    const backgroundStyle = {
//      background: `url('${this.props.image}') center / cover`
//    };
//
//    return (
//      <div className="mdl-card mdl-shadow--2dp">
//        <div className="mdl-card__media" onClick={this.props.onClick}>
//          <div className={styles.gameCard__image} style={backgroundStyle}>
//            <div className={styles.gameCard__imageOverlay}>
//              <h2 className={styles.gameCard__titleText}>{this.props.title}</h2>
//            </div>
//          </div>
//        </div>
//        <div className="mdl-card__supporting-text">
//          {this.props.description}
//        </div>
//        <div className="mdl-card__actions">
//          <Link to={this.props.link}>
//            <RaisedButton secondary={true} label="Zagraj" />
//          </Link>
//        </div>
//      </div>
//    )
//  }
//}

GameCard.propTypes = props;