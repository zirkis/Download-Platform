import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {querySeries} from '../../actions/series';

@connect(store => {
    return {
      series: store.series.series
    };
  },
  dispatch => {
    return {
      querySeriesAction: () => {
        return dispatch(querySeries());
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
    return this.props.querySeriesAction()
      .then(() => {
        this.setState({loaded: true});
      });
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    return <View series={this.props.series}/>
  }
}

export default Container;
