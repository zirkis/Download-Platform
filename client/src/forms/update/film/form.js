import React from 'react';
// import moment from 'moment';
import {Field, reduxForm, change} from 'redux-form';
import {TextField, DatePicker} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {fullBlack} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import CSSModules from 'react-css-modules';

import styles from './styles.css';
import {fetchFilm} from '../../../actions/film';

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

const asyncValidate = (values, dispatch) => {
  const filter = {simple: {name: values.ref}};
  const errors = {};
  return dispatch(fetchFilm(filter))
    .then(film => {
      if (!film || !film.length) {
        errors.ref = 'No film found';
      }
      return errors;
    })
    .catch(() => {
      errors.ref = 'No film found';
      return errors;
    })
};

@connect(store => {
    return {
      film: store.film.film
    }
  },
  dispatch => {
    return {
      changeFieldValue(field, value) {
        dispatch(change('update_film', field, value))
      }
    };
  })
@reduxForm({
  form: 'update_film',
  validate,
  asyncValidate: asyncValidate
})
@CSSModules(styles)
class Form extends React.Component {
  initValue(film) {
    if (film) {
      this.props.changeFieldValue('name', film.name);
    }
  }
  componentDidMount() {
    this.initValue(this.props.film);
  }
  componentDidUpdate() {
    this.initValue(this.props.film);
  }
  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}
            styleName='form'>
        <div>
          <Field name="ref" component={TextField} type="text"
                 floatingLabelText="Film to update"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
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
        </div>
      </form>
    );
  }
  componentWillUnmount() {
    this.props.resetFilmAction();
  }
}

export default Form;
