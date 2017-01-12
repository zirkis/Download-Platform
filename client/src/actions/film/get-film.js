import {FilmSerializer} from '../../serializers/film';
import * as api from '../api';
import * as C from '../../constants/film';
import {getLinks} from '../links/get-links';

function fetchFilm() {
  return {
    type: C.FILM_FETCH
  }
}

export function getFilm(filter) {
  return dispatch => {
    let film = null;
    dispatch(fetchFilm());
    return api.getRessource('films', filter)
      .then(res => {
        const films = res.data.data;
        if (!films.length) {
          throw new Error('No film');
        }
        film = films[0];
        const links = film.relationships.downloadLinks.data.map(link => {
          return link.id;
        });
        return getLinks(links);
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
          type: C.FILM_FULFILLED,
          payload: filmDeserialized
        });
        return filmDeserialized;
      })
      .catch(err => {
        dispatch({
          type: C.FILM_ERROR,
          payload: err.error
        });
        return null;
      });
  }
}
