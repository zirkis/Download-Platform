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

const validation = values => {
  const errors = {};
  const requiredFields = [
    'name',
    'description',
    'posterLink',
    'productionDate',
    'actors',
    'director',
    'country',
    'length'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors;
};

@reduxForm({
  form: 'add_film',
  validation,
})
@CSSModules(styles)
class Form extends React.Component {
  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit} styleName='form'>
        <div>
          <Field name="name" component={TextField} type="text"
                 floatingLabelText="Name"
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
        <div>
          <Field name="posterLink" component={TextField} type="text"
                 floatingLabelText="Poster link"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="productionDate" component={DatePicker}
                 floatingLabelText="Production date"
                 floatingLabelStyle={floatingLabelStyle}
                 disableYearSelection={false}
                 format={(value, name) => value === '' ? null : value}
                 mode="landscape"
          />
        </div>
        <div>
          <Field name="actors" component={TextField} type="text"
                 floatingLabelText="Actors"
                 floatingLabelStyle={floatingLabelStyle}
                 multiLine={true}
                 rows={2}
                 rowsMax={5}
          />
        </div>
        <div>
          <Field name="director" component={TextField} type="text"
                 floatingLabelText="Director"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="country" component={TextField} type="text"
                 floatingLabelText="Country"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="length" component={TextField} type="number"
                 floatingLabelText="Length (min)"
                 floatingLabelStyle={floatingLabelStyle}
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
