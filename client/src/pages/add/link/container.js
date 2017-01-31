import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reset} from 'redux-form';

import View from './view';
import {createLink} from '../../../actions/links/create-link';

@connect(undefined,
  dispatch => {
    return {
      createLinkAction: link => {
        delete link.serieSelected;
        dispatch(createLink(link));
        dispatch(reset('add_link'));
      }
    };
  })
class Container extends Component {
  render() {
    const {createLinkAction} = this.props;
    return <View onSubmit={createLinkAction}/>;
  }
}

export default Container;
