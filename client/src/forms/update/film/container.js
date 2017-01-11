import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form';

import Form from './form';
import {queryFilms} from '../../../actions/films';
import {resetFilm} from '../../../actions/film';

@connect(store => {
    const selector = formValueSelector('update_film');
    return {
      posterLink: selector(store, 'posterLink'),
      film: store.film.film,
      films: store.films.films
    }
  },
  dispatch => {
    return {
      queryFilmsAction: () => {
        return dispatch(queryFilms());
      },
      resetFilmAction() {
        dispatch(resetFilm());
      }
    };
  })
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  componentWillMount() {
    return this.props.queryFilmsAction()
      .then(() => {
        this.setState({loaded: true});
      });
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    const {onSubmit, films, film, resetFilmAction, posterLink} = this.props;
    return (
      <Form
        films={films}
        film={film}
        posterLink={posterLink}
        onSubmit={onSubmit}
        resetFilmAction={resetFilmAction}
      />
    );
  }
}

export default Container;
