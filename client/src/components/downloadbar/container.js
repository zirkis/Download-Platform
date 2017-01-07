import React, {Component} from 'react';

import View from './view';

class Container extends Component {
  render() {
    return <View links={this.props.links}
                 language={this.props.language}/>
  }
}

export default Container;