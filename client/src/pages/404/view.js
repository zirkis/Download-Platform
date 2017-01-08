import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import {UserSerializer} from '../../serializers/user';

class View extends Component {
  render() {
    const data = [{
      id: "1",
      email: "",
      password: ""
    }];
    console.log(UserSerializer.serialize(data));
    return (
      <DocumentTitle title='404 :p'>
        <div>
          404 not found
        </div>
      </DocumentTitle>
    );
  }
}

export default View;
