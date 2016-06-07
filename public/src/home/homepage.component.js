import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle,
  RaisedButton, Dialog, TextField} from 'material-ui';
import {Col, Grid, Row} from 'react-flexbox-grid';
import {Link} from 'react-router';
import {GameCard} from './';
import {store} from '../root.store';
import {toggleDialog} from './home.actions';

store.subscribe(() => console.log(store.getState()));

export class Homepage extends React.Component {
  toggleDialog() {
    console.log('ladny log');
    store.dispatch(toggleDialog('checkersDialog'));
  }

  render() {
    const actions = [
      <RaisedButton label="OK"></RaisedButton>,
      <RaisedButton label="Anuluj"></RaisedButton>
    ];

    return (
      <Grid>
        <Row>
          <Col xs={12} md={5}>
            <GameCard title="Warcaby" subtitle="Zagraj z przyjaciółmi w tradycyjną grę logiczną"
                      link="/checkers"    shortCutLink="/checkers"    image="images/checkers.jpg" description="Zagraj z przyjaciółmi w tradycyjną grę logiczną" onClick={() => {
                        this.props.toggleDialog('checkersDialog');
                      }} />
          </Col>
          <Col xs={12} md={5}>
            <GameCard title="Kalambury" subtitle="Zagraj z przyjaciółmi w kalambury"
                      link="/puns"   shortCutLink="/puns"  image="images/puns.png" description="Zagraj z przyjaciółmi w kalambury" onClick={() => {
                        this.props.toggleDialog('punsDialog');
                      }} />
          </Col>
        </Row>
        <Dialog title="Warcaby" actions={actions} modal={false} open={this.props.checkersDialog.open}
          onRequestClose={() => {this.props.toggleDialog('checkersDialog');}}>
          Wprowadź id gry
          <TextField></TextField>
        </Dialog>
      </Grid>
    )
  }
}