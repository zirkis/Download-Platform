import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {removeFilm} from '../../../actions/film';

@connect(null,
  dispatch => {
    return {
      removeFilm: id => {
        dispatch(removeFilm(id));
      }
    }
  })
class Container extends Component {
  render() {
    return <View onSubmit={this.props.removeFilm}/>;
  }
}

export default Container;
