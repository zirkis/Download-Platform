import {change} from 'redux-form';
import {getEpisode} from '../../../actions/episodes/get-episode';

const resetValues = dispatch => {
  const formName = 'update_episode';
  dispatch(change(formName, 'id', null));
  dispatch(change(formName, 'name', null));
  dispatch(change(formName, 'saison', null));
  dispatch(change(formName, 'number', null));
  dispatch(change(formName, 'resume', null));
};

const fillForm = (dispatch, episode) =>{
  const formName = 'update_episode';
  dispatch(change(formName, 'id', episode.id));
  dispatch(change(formName, 'name', episode.name));
  dispatch(change(formName, 'saison', episode.saison));
  dispatch(change(formName, 'number', episode.number));
  dispatch(change(formName, 'resume', episode.resume));
};

export const validate = values => {
  const errors = {};
  const requiredFields = [
    'serie',
    'episode',
    'serieSelected',
    'episodeSelected'
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

export const asyncValidate = (values, dispatch) => {
  const filter = {simple: {name: values.episode}};
  const errors = {};
  return dispatch(getEpisode(filter))
    .then(episode => {
      console.log(episode);
      if (!episode) {
        resetValues(dispatch);
        errors.episode= 'No episode found';
      } else {
        fillForm(dispatch, episode);
      }
      return errors;
    })
    .catch(() => {
      errors.episode = 'No episode found';
      return errors;
    });
};
