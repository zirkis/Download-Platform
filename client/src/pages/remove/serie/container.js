import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {createSerie} from '../../../actions/serie';

@connect(null,
  dispatch => {
    return {
      createSerie: serie => {
        console.log(serie);
        dispatch(createSerie(serie));
      }
    }
  })
class Container extends Component {
  render() {
    return <View onSubmit={this.props.createSerie}/>;
  }
}

export default Container;
