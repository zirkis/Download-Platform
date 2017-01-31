import React, {Component} from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';
import DeleteLinkForm from '../../../forms/delete/link/container';

@CSSModules(styles)
class View extends Component {
  render() {
    const {onSubmit} = this.props;
    return (
      <div styleName="container">
        <DeleteLinkForm onSubmit={onSubmit}/>
      </div>
    );
  }
}

export default View;
