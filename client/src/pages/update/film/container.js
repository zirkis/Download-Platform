import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
// import {editFilm} from '../../../actions/film';

@connect(null,
  dispatch => {
    return {
      editFilm: film => {
        console.log(film);
        // dispatch(editFilm(film));
      }
    }
  })
class Container extends Component {
  render() {
    return <View onSubmit={this.props.editFilm}/>;
  }
}

export default Container;
