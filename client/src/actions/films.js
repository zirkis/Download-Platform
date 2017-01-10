import axios from 'axios';
import Qs from 'qs';

import CONFIG from '../../config/default.json';
import {FilmSerializer} from '../serializers/film';
import {
  FILMS_FETCH,
  FILMS_FULFILLED,
  FILMS_ERROR,
  FILMS_SORTING,
  FILMS_SORTED,
  FILMS_SORTED_FAIL
} from '../constants/films';

function filmsFetch() {
  return {
    type: FILMS_FETCH
  }
}

export function queryFilms(filter) {
  return dispatch => {
    dispatch(filmsFetch());
    return axios({
      url: `${CONFIG['apiUrl']}/films`,
      method: 'get',
      params: {
        filter
      },
      paramsSerializer: params => {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
      responseType: 'json'
    })
      .then(res => {
        const films = {
          "data": res.data.data
        };
        return FilmSerializer.deserialize(films);
      })
      .then(films => {
        dispatch({
          type: FILMS_FULFILLED,
          payload: films
        });
        return films;
      })
      .catch(err => {
        dispatch({
          type: FILMS_ERROR,
          payload: err.error
        });
      });
  }
}

function sortingInProgress() {
  return {
    type: FILMS_SORTING
  };
}

function sortingFail(err) {
  return {
    type: FILMS_SORTED_FAIL,
    payload: err
  };
}
export function sortFilms(films) {
  return dispatch => {
    if (!films) {
      return dispatch(sortingFail('No films'));
    }
    dispatch(sortingInProgress());
    films.sort((a, b) => {
      return (a.addedAt >= b.addedAt)
    }).reverse();
    dispatch({
      type: FILMS_SORTED,
      payload: films
    });
  }
}
