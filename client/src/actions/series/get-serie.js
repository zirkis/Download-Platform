import * as api from '../api';
import * as C from '../../constants/series';
import {SerieSerializer} from '../../serializers/serie';

function fetchInProgress() {
  return {
    type: C.SERIE_FETCH
  };
}

function fetchSuccess(serie) {
  return {
    type: C.SERIE_FULFILLED,
    payload: serie
  };
}

function fetchError(error) {
  return {
    type: C.SERIE_ERROR,
    payload: error
  };
}

function cleanSerie(serie) {
  serie.episodes = serie.episodes.filter(episode => {
    return episode;
  });
  if (!serie.episodes.length) {
    serie.episodes = null;
    return serie;
  }
  for (let i = 0; i < serie.episodes.length; i++) {
    serie.episodes[i].downloadLinks = serie.episodes[i].downloadLinks
      .filter(links => {
        return links;
      });
    if (!serie.episodes[i].downloadLinks.length) {
      serie.episodes[i].downloadLinks = null;
    }
  }
  return serie;
}

function seriesDeserialize(dispatch, series, episodes, links) {
  if (series && episodes && episodes.data && episodes.included) {
    series.included = series.included.concat(episodes.data);
    series.included = series.included.concat(episodes.included);
  }
  if (series && links && links.data && links.included) {
    series.included = series.included.concat(links.data);
    series.included = series.included.concat(links.included);
  }
  console.log(series);
  return SerieSerializer.deserialize(series)
    .then(seriesDeserialized => {
      const serie = cleanSerie(seriesDeserialized[0]);
      dispatch(fetchSuccess(serie));
      console.log(serie);
      return serie;
    });
}

function getSerieEpisodes(series) {
  const episodesId = series.data[0].relationships.episodes.data.map(episode => {
    return episode.id;
  });
  if (!episodesId || !episodesId.length) {
    return Promise.resolve();
  }
  const filterEpisode = {simple: {_id: {$in: episodesId}}};
  return api.getRessource('episodes', filterEpisode, 'uploader');
}

function getSerieEpisodesLinks(episodes) {
  let linksId = [];
  episodes.data.forEach(episode => {
    const episodeLinks = episode.relationships.downloadLinks.data.map(link => {
      return link.id;
    });
    linksId = linksId.concat(episodeLinks);
  });
  if (!linksId || !linksId.length) {
    return Promise.resolve();
  }
  const filterLink = {simple: {_id: {$in: linksId}}};
  return api.getRessource('links', filterLink, 'uploader');
}

export function getSerie(filter) {
  let series;
  let episodes;
  let links;
  return dispatch => {
    dispatch(fetchInProgress());
    return api.getRessource('series', filter, 'uploader')
      .then(res => {
        series = res.data;
        if (!series || !series.data[0]) {
          return seriesDeserialize(dispatch, null, null, null);
        }
        return getSerieEpisodes(series)
          .then(res => {
            if (res && res.data) {
              episodes = res.data;
            }
            if (!episodes || !episodes.data[0]) {
              return seriesDeserialize(dispatch, series, null, null);
            }
            return getSerieEpisodesLinks(episodes)
              .then(res => {
                if (res && res.data) {
                  links = res.data;
                }
                return seriesDeserialize(dispatch, series, episodes, links);
              });
          });
      })
      .catch(err => {
        dispatch(fetchError(err));
        return null;
      });
  };
}
