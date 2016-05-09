import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle,
  RaisedButton} from 'material-ui';
import {Col, Grid, Row} from 'react-flexbox-grid';
import {Link} from 'react-router';
import {GameCard} from './';

export class Home extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={5}>
            <GameCard title="Warcaby" subtitle="Zagraj z przyjaciółmi w tradycyjną grę logiczną"
              link="/checkers" image="images/checkers.jpg" description="Dupadupa" />
          </Col>
          <Col xs={12} md={5}>
            <GameCard title="Kalambury" subtitle="Zagraj z przyjaciółmi w kalambury"
                      link="/puns" image="images/puns.png" description="Dupadupa" />
          </Col>
        </Row>
      </Grid>
    )
  }
}