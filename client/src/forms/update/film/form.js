import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {TextField, DatePicker, AutoComplete} from 'redux-form-material-ui';
import {Modal, Image} from 'semantic-ui-react';
import RaisedButton from 'material-ui/RaisedButton';
import {fullBlack} from 'material-ui/styles/colors';
import CSSModules from 'react-css-modules';

import styles from './styles.css';
import {validate, asyncValidate} from './validations';

const floatingLabelStyle = {
  color: fullBlack
};

@reduxForm({
  form: 'update_film',
  validate,
  asyncValidate,
  asyncBlurFields: ['ref']
})
@CSSModules(styles)
class Form extends React.Component {
  onNewRequest() {
    const {asyncValidate} = this.props;
    asyncValidate();
  }
  render() {
    const {handleSubmit, films, isFilmSelected, posterLink} = this.props;
    return (
      <form onSubmit={handleSubmit} styleName='form'>
        <div>
          <Field name="ref" component={AutoComplete} type="text"
                 floatingLabelText="Film to update"
                 floatingLabelStyle={floatingLabelStyle}
                 fullWidth={true}
                 filter={AutoComplete.caseInsensitiveFilter}
                 dataSource={films.map(film => film.name)}
                 onNewRequest={() => this.onNewRequest()}
          />
        </div>
        {isFilmSelected &&
        <div>
          <div>
            <Field name="name" component={TextField} type="text"
                   floatingLabelText="New Name"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
            />
          </div>
          <div>
            <Field name="description" component={TextField} type="text"
                   floatingLabelText="New Description"
                   floatingLabelStyle={floatingLabelStyle}
                   multiLine={true}
                   fullWidth={true}
                   rows={2}
                   rowsMax={5}
            />
          </div>
          <div>
            <Field name="posterLink" component={TextField} type="text"
                   floatingLabelText="New Poster link"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
            />
            <Modal trigger={
              <RaisedButton
                label='Show poster'
                style={{'width': '25%'}}
                backgroundColor="grey"
                type='button'
              />}
                   size="small"
            >
              <Modal.Header>Overview</Modal.Header>
              <Modal.Content>
                <Image src={posterLink}
                       fluid/>
              </Modal.Content>
            </Modal>
          </div>
          <div>
            <Field name="productionDate" component={DatePicker}
                   floatingLabelText="New Production date"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
                   disableYearSelection={false}
                   format={(value, name) => value === '' ? null : value}
                   mode="landscape"
            />
          </div>
          <div>
            <Field name="actors" component={TextField} type="text"
                   floatingLabelText="New Actors (one line per actor)"
                   floatingLabelStyle={floatingLabelStyle}
                   multiLine={true}
                   fullWidth={true}
                   rows={2}
                   rowsMax={5}
            />
          </div>
          <div>
            <Field name="director" component={TextField} type="text"
                   floatingLabelText="New Director"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}

            />
          </div>
          <div>
            <Field name="country" component={TextField} type="text"
                   floatingLabelText="New Country"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
            />
          </div>
          <div>
            <Field name="length" component={TextField} type="number"
                   floatingLabelText="New Length (min)"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
            />
          </div>
        </div>
        }
        <div styleName='button'>
          <RaisedButton
            label='Update'
            style={{'width': '50%'}}
            backgroundColor="grey"
            type='submit'
          />
        </div>
      </form>
    );
  }
}

export default Form;
