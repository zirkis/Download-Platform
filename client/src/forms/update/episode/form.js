import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {TextField, DatePicker} from 'redux-form-material-ui';
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
    'ref',
    'serie_ref'
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
          <Field name="ref" component={TextField} type="text"
                 floatingLabelText="Title"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="serie_ref" component={TextField} type="text"
                 floatingLabelText="Serie"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="name" component={TextField} type="text"
                 floatingLabelText="New Title"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="serie" component={TextField} type="text"
                 floatingLabelText="New Serie"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="saison" component={TextField} type="number"
                 floatingLabelText="New Season"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="number" component={TextField} type="number"
                 floatingLabelText="New Number"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="description" component={TextField} type="text"
                 floatingLabelText="New Description"
                 floatingLabelStyle={floatingLabelStyle}
                 multiLine={true}
                 rows={2}
                 rowsMax={5}
          />
        </div>
        <div styleName='button'>
          <RaisedButton
            label='Update'
            style={ {'width': '50%'} }
            type='submit'
          />
        </div>
      </form>
    );
  }
}

export default Form;
