import {EpisodeSerializer} from '../../serializers/episode';
import * as api from '../api';
import * as C from '../../constants/episodes';

function episodeCreate() {
  return {
    type: C.EPISODE_CREATE
  };
}

export function createEpisode(episode) {
  return dispatch => {
    const {serieId} = episode;
    console.log(episode);
    dispatch(episodeCreate());
    const data = EpisodeSerializer.serialize(episode);
    console.log(data);
    delete data.data.id;
    return api.postRessource('episodes', data)
      .then(() => {
        dispatch({
          type: C.EPISODE_CREATE_SUCCESS,
          payload: episode
        });
        return episode;
      })
      .catch(err => {
        dispatch({
          type: C.EPISODE_CREATE_ERROR,
          payload: err.error
        });
        return null;
      });
  }
}
