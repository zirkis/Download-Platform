import axios from 'axios';
import Qs from 'qs';

import CONFIG from '../../config/default.json';
import {FilmSerializer} from '../serializers/film';
import {
  FILM_CREATE,
  FILM_CREATE_SUCCESS,
  FILM_CREATE_ERROR,
  FILM_FETCH,
  FILM_FULFILLED,
  FILM_ERROR
} from '../constants/film';
import {queryLinks} from './links';

function filmCreate() {
  return {
    type: FILM_CREATE
  }
}
export function createFilm(film) {
  return dispatch => {
    const filmRecord = {
      ...film,
      actors: film.actors.split(/\r?\n/)
    };
    const data = FilmSerializer.serialize(filmRecord);
    delete data.data.id;
    console.log(data);
    dispatch(filmCreate());
    return axios({
      method: 'post',
      url: `${CONFIG['apiUrl']}/films`,
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      data
    })
      .then(() => {
        dispatch({
          type: FILM_CREATE_SUCCESS,
          payload: film
        });
      })
      .catch(err => {
        dispatch({
          type: FILM_CREATE_ERROR,
          payload: err.error
        });
      });
  }
}

function filmFetch() {
  return {
    type: FILM_FETCH
  }
}
export function fetchFilm(_id) {
  let film = null;
  const filter = {simple: {_id}};
  return dispatch => {
    dispatch(filmFetch());
    return axios({
      url: `${CONFIG['apiUrl']}/films`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        filter
      },
      paramsSerializer: params => {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
      responseType: 'json'
    })
      .then(res => {
        const films = res.data.data;
        film = films[0];
        const links = film.relationships.downloadLinks.data.map(link => {
          return link.id;
        });
        return queryLinks(links);
      })
      .then(res => {
        const data = {
          "data": film,
          "included": res
        };
        return FilmSerializer.deserialize(data);
      })
      .then(film => {
        dispatch({
          type: FILM_FULFILLED,
          payload: film
        });
      })
      .catch(err => {
        dispatch({
          type: FILM_ERROR,
          payload: err.error
        });
      });
  }
}
