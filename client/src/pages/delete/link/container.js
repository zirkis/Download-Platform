import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reset} from 'redux-form';

import View from './view';
import {deleteLink} from '../../../actions/links/delete-link';

@connect(undefined,
  dispatch => {
    return {
      deleteLinkAction: form => {
        dispatch(deleteLink(form.id));
        dispatch(reset('delete_link'));
      }
    };
  })
class Container extends Component {
  render() {
    return <View onSubmit={this.props.deleteLinkAction}/>;
  }
}

export default Container;
