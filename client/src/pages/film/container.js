import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {getFilm} from '../../actions/film/get-film';

@connect(undefined,
  dispatch => {
    return {
      getFilmAction: id => {
        return dispatch(getFilm(id));
      }
    }
  })
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      film: null
    };
  }
  componentWillMount() {
    const _id = this.props.routeParams.id;
    const filter = {simple: {_id}};
    this.props.getFilmAction(filter)
      .then(film => {
        this.setState({
          loaded: true,
          film
        });
      })
  }
  render() {
    if (!this.state.loaded || !this.state.film) {
      return null;
    }
    return (
      <View film={this.state.film}/>
    );
  }
}

export default Container;
