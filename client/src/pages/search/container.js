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
      queryFilmsAction: search => {
        const filter = {
          simple: {
            name: {
              $regex: `.*${search}.*`,
              $options: 'i'
            }
          }
        };
        return dispatch(queryFilms(filter));
      },
      querySeriesAction: search => {
        const filter = {
          simple: {
            name: {
              $regex: `.*${search}.*`,
              $options: 'i'
            }
          }
        };
        return dispatch(querySeries(filter));
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
  componentWillReceiveProps(nextProps) {
    const lastSearch = this.props.routeParams.search;
    const newSearch = nextProps.routeParams.search;
    if (this.state.loaded && lastSearch !== newSearch) {
      this.setState({loaded: false});
      this._loadMedia(newSearch);
    }
  }
  componentWillMount() {
    const search = this.props.routeParams.search;
    this._loadMedia(search);
  }
  _loadMedia(search) {
    return this.props.queryFilmsAction(search)
      .then(() => {
        return this.props.querySeriesAction(search);
      })
      .then(() => {
        this.setState({loaded: true});
      });
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <div key={this.props.routeParams.search}>
        <View
          films={this.props.films}
          search={this.props.routeParams.search}
          series={this.props.series}
        />
      </div>

    )
  }
}

export default Container;
