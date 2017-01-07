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

@reduxForm({
  form: 'add_film'
})
@CSSModules(styles)
class Form extends React.Component {
  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit} styleName='form'>
        <div>
          <Field name="email" component={TextField} type="text"
                 floatingLabelText="Email"
                 floatingLabelStyle={floatingLabelStyle}
          />
        </div>
        <div>
          <Field name="password" component={TextField} type="password"
                 floatingLabelText="Password"
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
