import React, {Component} from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

@CSSModules(styles)
class View extends Component {
  render() {
    const {onSubmit} = this.props;
    return (
      <div styleName='container'>
      </div>
    );
  }
}

export default View;
