import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {queryFilms, sortFilms} from '../../actions/films';
import {querySeries, sortSeries} from '../../actions/series';

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
      sortFilmsActions: films => {
        return dispatch(sortFilms(films));
      },
      querySeriesAction: () => {
        return dispatch(querySeries());
      },
      sortSeriesActions: series => {
        return dispatch(sortSeries(series));
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
        return this.props.sortFilmsActions(this.props.films);
      })
      .then(() => {
        return this.props.querySeriesAction();
      })
      .then(() => {
        return this.props.sortSeriesActions(this.props.series);
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
