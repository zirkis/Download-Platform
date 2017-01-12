import axios from 'axios';
import Qs from 'qs';

import CONFIG from '../../config/default.json';

export function getRessource(ressourceType, filter) {
  return axios({
    method: 'get',
    url: `${CONFIG['apiUrl']}/${ressourceType}`,
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
}

export function postRessource(ressourceType, data) {
  return axios({
    method: 'post',
    url: `${CONFIG['apiUrl']}/${ressourceType}`,
    headers: {
      'Content-Type': 'application/vnd.api+json'
    },
    data
  })
}

export function updateRessource(ressourceType, data) {

}

export function deleteRessource(ressourceType, data) {

}

export function login(creds) {
  return axios({
    url: `${CONFIG['apiUrl']}/users/login`,
    timeout: 20000,
    method: 'post',
    data: creds,
    responseType: 'json'
  })
}

export function authenticate(token) {
  return axios({
    url: `${CONFIG['apiUrl']}/users/authenticate`,
    timeout: 20000,
    method: 'post',
    data: {token},
    responseType: 'json'
  })
}
