import React, {Component} from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';
import AddLinkForm from '../../../forms/add/link/container';

@CSSModules(styles)
class View extends Component {
  render() {
    const {onSubmit} = this.props;
    return (
      <div styleName="container">
        <AddLinkForm onSubmit={onSubmit}/>
      </div>
    );
  }
}

export default View;
