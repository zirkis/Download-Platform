import React, {Component} from 'react';
import {connect} from 'react-redux';

import Form from './form';
import {queryFilms} from '../../../actions/films';

@connect(store => {
    return {
      films: store.films.films
    }
  },
  dispatch => {
    return {
      queryFilmsAction: () => {
        return dispatch(queryFilms());
      }
    };
  })
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  componentWillMount() {
    this.props.queryFilmsAction()
      .then(() => {
        this.setState({loaded: true});
      });
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    const {onSubmit, films} = this.props;
    return (
      <Form
        films={films}
        onSubmit={onSubmit}
      />
    );
  }
}

export default Container;
