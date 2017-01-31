import {EpisodeSerializer} from '../../serializers/episode';
import * as api from '../api';
import * as C from '../../constants/episodes';
import {updateSerie} from '../series/update-serie';

function createInProgress() {
  return {
    type: C.EPISODE_CREATE
  };
}

function createSuccess(episode) {
  return {
    type: C.EPISODE_CREATE_SUCCESS,
    payload: episode
  };
}

function createError(error) {
  return {
    type: C.EPISODE_CREATE_ERROR,
    payload: error
  };
}

export function createEpisode(episode) {
  return dispatch => {
    dispatch(createInProgress());

    const {serie} = episode;
    delete episode.serie;
    episode = {
      ...episode,
      addedAt: Date.now()
    };
    const episodeSerialized = EpisodeSerializer.serialize(episode);
    delete episodeSerialized.data.id;

    return api.postRessource('episodes', episodeSerialized)
      .then(res => {
        episode.id = res.data.data.id;
        if (!serie.episodes) {
          serie.episodes= [];
        }
        serie.episodes.push({id: episode.id});
        serie.actors = serie.actors.join('\n');

        return dispatch(updateSerie(serie));
      })
      .then(() => {
        dispatch(createSuccess(episode));
        return episode;
      })
      .catch(err => {
        dispatch(createError(err));
        return null;
      });
  };
}
