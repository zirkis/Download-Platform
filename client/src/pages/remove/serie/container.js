import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
// import {removeSerie} from '../../../actions/serie/remove-serie';

@connect(null,
  dispatch => {
    return {
      removeSerieAction: serie => {
        console.log(serie);
        // dispatch(removeSerie(serie));
      }
    }
  })
class Container extends Component {
  render() {
    return <View onSubmit={this.props.removeSerieAction}/>;
  }
}

export default Container;
