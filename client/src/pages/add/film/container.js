import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {createFilm} from '../../../actions/film';

@connect(null,
  dispatch => {
    return {
      createFilmHandler: film => {
        console.log(film);
        // dispatch(createFilm(film));
      }
    }
  })
class Container extends Component {
  render() {
    return <View submitHandler={this.props.createFilmHandler}/>;
  }
}

export default Container;
