import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {fetchFilm, resetFilm} from '../../actions/film';

@connect(store => {
    return {
      film: store.film.film
    };
  },
  dispatch => {
    return {
      fetchFilm: id => {
        return dispatch(fetchFilm(id));
      },
      resetFilmAction: () => {
        dispatch(resetFilm());
      }
    }
  })
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  componentWillMount() {
    const id = this.props.routeParams.id;
    const filter = {simple: {_id: id}};
    return this.props.fetchFilm(filter)
      .then(() => {
        this.setState({loaded: true});
      })
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <View film={this.props.film}/>
    );
  }
  componentWillUnmount() {
    this.props.resetFilmAction();
  }
}

export default Container;
