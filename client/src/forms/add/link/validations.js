import {change} from 'redux-form';
import {getEpisode} from '../../../actions/episodes/get-episode';

export const validate = values => {
  const errors = {};
  const requiredFields = [
    'serie',
    'episode',
    'serieSelected',
    'episodeSelected',
    'host',
    'link',
    'quality',
    'language',
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
      if (!episode) {
        errors.episode= 'No episode found';
        dispatch(change('add_link', 'episodeSelected', null));
      } else {
        dispatch(change('add_link', 'episodeSelected', episode));
      }
      return errors;
    })
    .catch(() => {
      errors.episode = 'No episode found';
      return errors;
    });
};
