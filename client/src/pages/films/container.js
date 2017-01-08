import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {queryFilms} from '../../actions/films';

@connect(store => {
    return {
      films: store.films.films
    };
  },
  dispatch => {
    return {
      queryFilmsAction: () => {
        return dispatch(queryFilms());
      }
    }
  })
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  componentWillMount() {
    return this.props.queryFilmsAction()
      .then(() => {
        this.setState({loaded: true});
      });
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    return <View
      films={this.props.films}
    />
  }
}

export default Container;
