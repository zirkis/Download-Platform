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
    'ref'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors;
};

@reduxForm({
  form: 'update_film',
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
                 floatingLabelText="Name"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="name" component={TextField} type="text"
                 floatingLabelText="New Name"
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
        <div>
          <Field name="posterLink" component={TextField} type="text"
                 floatingLabelText="New Poster link"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="productionDate" component={DatePicker}
                 floatingLabelText="New Production date"
                 floatingLabelStyle={floatingLabelStyle}
                 disableYearSelection={false}
                 format={(value, name) => value === '' ? null : value}
                 mode="landscape"
          />
        </div>
        <div>
          <Field name="actors" component={TextField} type="text"
                 floatingLabelText="New Actors"
                 floatingLabelStyle={floatingLabelStyle}
                 multiLine={true}
                 rows={2}
                 rowsMax={5}
          />
        </div>
        <div>
          <Field name="director" component={TextField} type="text"
                 floatingLabelText="New Director"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="country" component={TextField} type="text"
                 floatingLabelText="New Country"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="length" component={TextField} type="number"
                 floatingLabelText="New Length (min)"
                 floatingLabelStyle={floatingLabelStyle}
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
