import * as api from '../api';
import * as C from '../../constants/serie';
import {SerieSerializer} from '../../serializers/serie';
import {getLinks} from '../links/get-links';
import {getEpisodes} from '../episodes/get-episodes';

function fetchSerie() {
  return {
    type: C.SERIE_FETCH
  }
}

export function getSerie(filter) {
  let serie = null;
  let included = [];
  return dispatch => {
    dispatch(fetchSerie());
    return api.getRessource('series', filter)
      .then(res => {
        const series = res.data.data;
        serie = series[0];
        const episodesId = serie.relationships.episodes.data.map(episode => {
          return episode.id;
        });
        return getEpisodes(episodesId);
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
        return getLinks(linksId);
      })
      .then(links => {
        included = included.concat(links);
        const data = {
          "data": serie,
          "included": included
        };
        return SerieSerializer.deserialize(data);
      })
      .then(serieDeserialized => {
        dispatch({
          type: C.SERIE_FULFILLED,
          payload: serieDeserialized
        });
        return serieDeserialized;
      })
      .catch(err => {
        dispatch({
          type: C.SERIE_ERROR,
          payload: err.error
        });
        return null;
      });
  }
}
