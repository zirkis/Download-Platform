import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
// import {removeFilm} from '../../../actions/film/remove-film';

@connect(null,
  dispatch => {
    return {
      removeFilmAction: id => {
        // dispatch(removeFilm(id));
      }
    }
  })
class Container extends Component {
  render() {
    return <View onSubmit={this.props.removeFilmAction}/>;
  }
}

export default Container;
