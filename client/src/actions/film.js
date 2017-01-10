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
  FILM_ERROR,
  FILM_RESET
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

export function fetchFilm(filter) {
  return dispatch => {
    let film = null;
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
        if (!films.length) {
          throw new Error('No film');
        }
        film = films[0];
        const links = film.relationships.downloadLinks.data.map(link => {
          return link.id;
        });
        return queryLinks(links);
      })
      .then(links => {
        const data = {
          "data": film,
          "included": links
        };
        return FilmSerializer.deserialize(data);
      })
      .then(filmDeserialized => {
        dispatch({
          type: FILM_FULFILLED,
          payload: filmDeserialized
        });
        return filmDeserialized;
      })
      .catch(err => {
        dispatch({
          type: FILM_ERROR,
          payload: err.error
        });
        return null;
      });
  }
}

export function resetFilm() {
  return {
    type: FILM_RESET
  }
}