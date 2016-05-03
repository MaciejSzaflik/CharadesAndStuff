import React from 'react'
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Card, CardHeader, CardText, CardActions, FlatButton} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export class Home extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={4}/>
          <Col md={4}>
            <Card>
              <CardHeader title="Home">
              </CardHeader>
              <CardText>
                No siemaeczko
              </CardText>
              <CardActions>
                <FlatButton label="Dupa"></FlatButton>
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Grid>
    )
  }
}