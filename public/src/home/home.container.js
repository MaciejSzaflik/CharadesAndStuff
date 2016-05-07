import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle,
  RaisedButton} from 'material-ui';
import {Col, Grid, Row} from 'react-flexbox-grid'

export class Home extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4}>
            <Card>
              <CardMedia overlay={<CardTitle title="Warcaby" subtitle="Zagraj z przyjaciółmi w tradycyjną grę logiczną" />}>
                <img src="images/checkers.jpg" />
              </CardMedia>
              <CardText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</CardText>
              <CardActions>
                <RaisedButton secondary={true} label="Zagraj"></RaisedButton>
              </CardActions>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card>
              <CardMedia overlay={<CardTitle title="Kalambury" subtitle="Zagraj z przyjaciółmi w tradycyjną grę logiczną" />}>
                <img src="images/puns.png" />
              </CardMedia>
              <CardText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</CardText>
              <CardActions>
                <RaisedButton secondary={true} label="Zagraj"></RaisedButton>
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Grid>
    )
  }
}