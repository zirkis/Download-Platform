import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {getFilms} from '../../actions/films/get-films';
import {getSeries} from '../../actions/series/get-series';

@connect(store => {
    return {
      films: store.films.films,
      series: store.series.series
    }
  },
  dispatch => {
    return {
      getFilmsAction: () => {
        return dispatch(getFilms());
      },
      getSeriesAction: () => {
        return dispatch(getSeries());
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
    this.props.getFilmsAction()
      .then(() => {
        return this.props.getSeriesAction();
      })
      .then(() => {
        this.setState({loaded: true});
      });
  }
  render() {
    const {films, series, redirect} = this.props;
    if (!this.state.loaded) {
      return null;
    }
    let media;
    if (films && series) {
      media = films
        .concat(series)
        .map(media => {
          const type = media.episodes ? 'serie' : 'film';
          return {
            id: media.id,
            type,
            name: media.name,
            image: media.posterLink
          };
        });
    }
    return <View
      media={media}
      redirect={redirect}
    />
  }
}

export default Container;
