import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {reset} from 'redux-form';

import View from './view';
// import {deleteSerie} from '../../../actions/serie/delete-serie';

@connect(undefined,
  dispatch => {
    return {
      deleteSerieAction: serie => {
        console.log(serie);
        // dispatch(deleteSerie(serie));
        // dispatch(reset('delete_serie'));
      }
    }
  })
class Container extends Component {
  render() {
    return <View onSubmit={this.props.deleteSerieAction}/>;
  }
}

export default Container;
