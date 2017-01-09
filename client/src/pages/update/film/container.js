import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {createFilm} from '../../../actions/film';

@connect(null,
  dispatch => {
    return {
      createFilm: film => {
        dispatch(createFilm(film));
      }
    }
  })
class Container extends Component {
  render() {
    return <View onSubmit={this.props.createFilm}/>;
  }
}

export default Container;
