import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {fetchSerie} from '../../actions/serie';

@connect(store => {
    return {
      serie: store.serie.serie
    };
  },
  dispatch => {
    return {
      fetchSerieAction: id => {
        return dispatch(fetchSerie(id));
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
    const id = this.props.routeParams.id;
    return this.props.fetchSerieAction(id)
      .then(() => {
        this.setState({loaded: true});
      });
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <View serie={this.props.serie}/>
    );
  }
  componentWillUnmount() {

  }
}

export default Container;
