import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import CSSModules from 'react-css-modules';
import {Grid} from 'semantic-ui-react';

import SideMenu from '../../components/add/side-menu/container';
import styles from './styles.css';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

@CSSModules(styles)
class Layout extends Component {
  render() {
    const title = this.props.children.props.location.pathname;
    title.capitalize().replace('\\', ' ');
    console.log(title);
    return (
    <DocumentTitle title='Add'>
      <div styleName='page'>
        <div styleName='container'>
          <h1 styleName='title'>Add</h1>
          <Grid>
            <Grid.Column width={4}>
              <div styleName='side-menu'>
                <SideMenu/>
              </div>
            </Grid.Column>
            <Grid.Column width={12}>
              <div styleName='content'>
                {this.props.children}
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    </DocumentTitle>
    );
  }
}

export default Layout;
