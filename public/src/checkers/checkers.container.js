import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';

export class Checkers extends React.Component {
	componentDidMount() {
    console.log(numberOfRows);
	initializeBoard("alfa","white");
  }
	
	
	
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            <div id="canvasParent" >
              <canvas id="checkers" width="300" height="300"></canvas>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}