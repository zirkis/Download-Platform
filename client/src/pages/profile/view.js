import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import DocumentTitle from 'react-document-title';
import {Button} from 'semantic-ui-react';

import styles from './styles.css';

@CSSModules(styles)
class View extends Component {
  render() {
    return (
      <DocumentTitle title='Profile'>
        <div styleName='page'>
          <div styleName='container'>
            <h1>Profile</h1>
            <Button
              onClick={() => {this.props.redirect('/add/film');}}>
              Add media
            </Button>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default View;
