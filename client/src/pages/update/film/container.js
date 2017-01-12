import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
// import {updateFilm} from '../../../actions/update-film';

@connect(null,
  dispatch => {
    return {
      updateFilmAction: film => {
        console.log(film);
        // dispatch(updateFilm(film));
      }
    }
  })
class Container extends Component {
  render() {
    return <View onSubmit={this.props.updateFilmAction}/>;
  }
}

export default Container;
