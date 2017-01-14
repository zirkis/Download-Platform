import * as C from '../../constants/series';

function serieCreate() {
  return {
    type: C.SERIE_CREATE
  }
}
export function createSerie(serie) {
  return dispatch => {
    dispatch(serieCreate());
    return Promise.resolve(serie);
  }
}