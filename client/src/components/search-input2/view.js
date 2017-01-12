import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import AutoComplete from 'material-ui/AutoComplete';
import {fullBlack} from 'material-ui/styles/colors';
import {Button, Icon} from 'semantic-ui-react'

import styles from './styles.css';

const floatingLabelStyle = {
  color: fullBlack
};

@CSSModules(styles)
class View extends Component {
  onNewRequest() {
    console.log('yoo');
  }
  render() {
    const {media} = this.props;

    return (
      <div styleName="container">
        <div styleName="input">
          <AutoComplete ref="search" name="search" type="text"
                        hintText="Search..."
                        floatingLabelStyle={floatingLabelStyle}
                        fullWidth={true}
                        filter={AutoComplete.caseInsensitiveFilter}
                        dataSource={media.map(m => m.name)}
                        onNewRequest={() => this.onNewRequest()}
                        style={{
                          padding: 0,
                          margin: 0,
                          height: '10px'
                        }} />
        </div>
        <Button icon>
          <Icon name='search' />
        </Button>

      </div>
    )
  }
}

export default View;
