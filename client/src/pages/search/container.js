import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {queryFilms} from '../../actions/films';
import {querySeries} from '../../actions/series';

@connect(store => {
    return {
      films: store.films.films,
      series: store.series.series
    };
  },
  dispatch => {
    return {
      queryFilmsAction: () => {
        return dispatch(queryFilms());
      },
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
    // const search = this.props.routeParams.search;
    return this.props.queryFilmsAction()
      .then(() => {
        return this.props.querySeriesAction();
      })
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
      series={this.props.series}
    />
  }
}

export default Container;
