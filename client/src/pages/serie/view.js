import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import DocumentTitle from 'react-document-title';

import styles from './styles.css';

@CSSModules(styles)
class View extends Component {
  render() {
    const film = this.props.film;
    console.log(film);
    return (
      <DocumentTitle title='Serie'>
        <div styleName='page'>
          <div styleName='container'>
            <h1 styleName="title">Serie</h1>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default View;
