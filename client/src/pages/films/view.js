import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import DocumentTitle from 'react-document-title';

import styles from './styles.css';
import AllFilm from '../../components/all-film/container';

@CSSModules(styles)
class View extends Component {
  render() {
    return (
      <DocumentTitle title='Films'>
        <div styleName='page'>
          <div styleName='container'>
            <h1>Films</h1>
            <AllFilm />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default View;
