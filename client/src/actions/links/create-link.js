import {LinkSerializer} from '../../serializers/link';
import * as api from '../api';
import * as C from '../../constants/links';
import {updateEpisode} from '../episodes/update-episode';

function createInProgress() {
  return {
    type: C.LINK_CREATE
  };
}

function createSuccess(link) {
  return {
    type: C.LINK_CREATE_SUCCESS,
    payload: link
  };
}

function createError(error) {
  return {
    type: C.LINK_CREATE_ERROR,
    payload: error
  };
}

export function createLink(link) {
  return dispatch => {
    dispatch(createInProgress());
    const episode = link.episodeSelected;
    delete link.episodeSelected;

    const data = LinkSerializer.serialize(link);
    delete data.data.id;
    console.log(data);
    return api.postRessource('links', data)
      .then(res => {
        link.id = res.data.data.id;
        if (!episode.downloadLinks) {
          episode.downloadLinks = [];
        }
        episode.downloadLinks.push({id: link.id});
        return dispatch(updateEpisode(episode));
      })
      .then(() => {
        dispatch(createSuccess(link));
        return link;
      })
      .catch(err => {
        dispatch(createError(err));
        return null;
      });
  };
}
