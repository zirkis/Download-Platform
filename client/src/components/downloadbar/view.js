import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import {Input, Menu, Button} from 'semantic-ui-react';

import styles from './styles.css';

@CSSModules(styles)
class View extends Component {
  render() {
    const links = this.props.links;
    console.log(links);
    return (
      <div styleName='container'>
        coucou..
      </div>
    )
  }
}
export default View;
