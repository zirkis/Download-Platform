import {EpisodeSerializer} from '../../serializers/episode';
import * as api from '../api';
import * as C from '../../constants/episodes';

function updateInProgress() {
  return {
    type: C.EPISODE_UPDATE
  };
}

function updateSuccess(episode) {
  return {
    type: C.EPISODE_UPDATE_SUCCESS,
    payload: episode
  };
}

function updateError(error) {
  return {
    type: C.EPISODE_UPDATE_ERROR,
    payload: error
  };
}

export function updateEpisode(episode) {
  return dispatch => {
    dispatch(updateInProgress());
    console.log(episode);
    const data = EpisodeSerializer.serialize(episode);
    console.log(data);
    return api.updateRessource('episodes', data)
      .then(() => {
        dispatch(updateSuccess(episode));
        return episode;
      })
      .catch(err => {
        dispatch(updateError(err));
      });
  };
}
