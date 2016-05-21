import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './home.actions';

import {Homepage} from './homepage.component';

function mapStateToProps(state) {
  return {
    checkersDialog: state.home.checkersDialog,
    punsDialog: state.home.punsDialog
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(Homepage);