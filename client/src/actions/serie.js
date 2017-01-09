import axios from 'axios';
import Qs from 'qs';

import CONFIG from '../../config/default.json';
import {SerieSerializer} from '../serializers/serie';
import {
  SERIE_CREATE,
  SERIE_FETCH,
  SERIE_FULFILLED,
  SERIE_ERROR
} from '../constants/serie';
import {queryLinks} from './links';
import {queryEpisodes} from './episodes';

function serieCreate() {
  return {
    type: SERIE_CREATE
  }
}
export function createSerie(serie) {
  return dispatch => {
    dispatch(serieCreate());
    return Promise.resolve(serie);
  }
}

function serieFetch() {
  return {
    type: SERIE_FETCH
  }
}
export function fetchSerie(_id) {
  let serie = null;
  let included = [];
  const filter = {simple: {_id}};
  return dispatch => {
    dispatch(serieFetch());
    return axios({
      url: `${CONFIG['apiUrl']}/series`,
      timeout: 20000,
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
        const series = res.data.data;
        serie = series[0];
        const episodesId = serie.relationships.episodes.data.map(episode => {
          return episode.id;
        });
        return queryEpisodes(episodesId);
      })
      .then(episodes => {
        const linksId = [];
        episodes.forEach(episode => {
          const lksId = episode.relationships.downloadLinks.data.map(link => {
            return link.id;
          });
          linksId.push(lksId);
        });
        included = included.concat(episodes);
        return queryLinks(linksId);
      })
      .then(links => {
        included = included.concat(links);
        const data = {
          "data": serie,
          "included": included
        };
        return SerieSerializer.deserialize(data);
      })
      .then(serie => {
        dispatch({
          type: SERIE_FULFILLED,
          payload: serie
        });
      })
      .catch(err => {
        dispatch({
          type: SERIE_ERROR,
          payload: err.error
        });
      });
  }
}
