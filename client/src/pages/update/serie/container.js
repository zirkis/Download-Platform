import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
// import {updateSerie} from '../../../actions/serie/update-serie';

@connect(null,
  dispatch => {
    return {
      updateSerieAction: film => {
        // dispatch(updateSerie(film));
      }
    }
  })
class Container extends Component {
  render() {
    return <View onSubmit={this.props.updateSerieAction}/>;
  }
}

export default Container;
