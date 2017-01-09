import axios from 'axios';
import Qs from 'qs';

import CONFIG from '../../config/default.json';
import {SerieSerializer} from '../serializers/serie';
import {
  SERIES_FETCH,
  SERIES_FULFILLED,
  SERIES_ERROR,
  SERIES_SORTING,
  SERIES_SORTED,
  SERIES_SORTED_FAIL
} from '../constants/series';

function seriesFetch() {
  return {
    type: SERIES_FETCH
  }
}

export function querySeries(filter) {
  return dispatch => {
    dispatch(seriesFetch());
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
        const series = {
          "data": res.data.data
        };
        return SerieSerializer.deserialize(series);
      })
      .then(series => {
        console.log(series);
        dispatch({
          type: SERIES_FULFILLED,
          payload: series
        });
      })
      .catch(err => {
        dispatch({
          type: SERIES_ERROR,
          payload: err.error
        });
      });
  }
}

function sortingInProgress() {
  return {
    type: SERIES_SORTING
  };
}

function sortingFail(err) {
  return {
    type: SERIES_SORTED_FAIL,
    payload: err
  };
}
export function sortSeries(series) {
  return dispatch => {
    if (!series) {
      return dispatch(sortingFail('No series'));
    }
    dispatch(sortingInProgress());
    series.sort((a, b) => {
      return a.addedAt < b.addedAt
    });
    dispatch({
      type: SERIES_SORTED,
      payload: series
    });
  }
}
