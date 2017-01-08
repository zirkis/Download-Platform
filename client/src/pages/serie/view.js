import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import DocumentTitle from 'react-document-title';

import styles from './styles.css';
import DateHelper from '../../helpers/date';
import DownloadBar from '../../components/downloadbar/container';

@CSSModules(styles)
class View extends Component {
  render() {
    console.log('Salut');
    /*const serie = this.props.serie;
    console.log(serie);*/
    return (
      <DocumentTitle title='Serie'>
        <div styleName='page'>
          <div styleName='container'>
            <h1>coucou</h1>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default View;
