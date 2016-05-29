import React from 'react'
import ReactDOM from 'react-dom';
import {routes} from './config/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {brown500, brown700, grey400, deepPurple200, deepPurple100, deepPurple400} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: brown500,
    primary2Color: brown700,
    primary3Color: grey400,
    accent1Color: deepPurple200,
    accent2Color: deepPurple100,
    accent3Color: deepPurple400,
    pickerHeaderColor: brown500
  }
});
ReactDOM.render(
  (
    <MuiThemeProvider muiTheme={muiTheme}>
      {routes}
    </MuiThemeProvider>
  ),
  document.getElementById('app')
);