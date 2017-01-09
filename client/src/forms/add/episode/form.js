import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {fullBlack} from 'material-ui/styles/colors';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

const floatingLabelStyle = {
  color: fullBlack
};

const validate = values => {
  const errors = {};
  const requiredFields = [
    'name',
    'serie',
    'saison',
    'number',
    'description'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors;
};

@reduxForm({
  form: 'add_episode',
  validate,
})
@CSSModules(styles)
class Form extends React.Component {
  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit} styleName='form'>
        <div>
          <Field name="name" component={TextField} type="text"
                 floatingLabelText="Title"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="serie" component={TextField} type="text"
                 floatingLabelText="Serie"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="saison" component={TextField} type="number"
                 floatingLabelText="Saison"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="number" component={TextField} type="number"
                 floatingLabelText="Number"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="description" component={TextField} type="text"
                 floatingLabelText="Description"
                 floatingLabelStyle={floatingLabelStyle}
                 multiLine={true}
                 rows={2}
                 rowsMax={5}
          />
        </div>
        <div styleName='button'>
          <RaisedButton
            label='Create'
            style={ {'width': '50%'} }
            type='submit'
          />
        </div>
      </form>
    );
  }
}

export default Form;
