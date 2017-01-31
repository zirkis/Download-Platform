import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form';

import Form from './form';
import {getSeries} from '../../../actions/series/get-series';
import {getSerieEpisode} from '../../../actions/series/get-serie-episodes';

@connect(store => {
    const selector = formValueSelector('update_episode');
    return {
      serieSelected: selector(store, 'serieSelected') || false,
      episodeSelected: selector(store, 'id') || false,
      series: store.series.series,
      episodes: store.episodes.episodes
    };
  },
  dispatch => {
    return {
      getSeriesAction: () => {
        return dispatch(getSeries());
      },
      getSerieEpisodeAction: serie => {
        const filter = {simple: {_id: serie.id}};
        return dispatch(getSerieEpisode(filter));
      }
    };
  })
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      episodes: null
    };
  }
  componentWillMount() {
    this.props.getSeriesAction()
      .then(() => {
        this.setState({
          ...this.state,
          loaded: true
        });
      });
  }
  componentWillReceiveProps(nextProps) {
    const lastSerieSelected = this.props.serieSelected;
    const newSerieSelected = nextProps.serieSelected;
    if (this.state.loaded && lastSerieSelected !== newSerieSelected) {
      this.props.getSerieEpisodeAction(newSerieSelected)
        .then(episodes => {
          this.setState({
            ...this.state,
            episodes
          });
        });
    }
  }
  render() {
    const {loaded, episodes} = this.state;
    const {onSubmit, serieSelected, episodeSelected, series} = this.props;

    if (!loaded) {
      return (
        <div>
          Loading ...
        </div>
      );
    }
    return (
      <Form
        serieSelected={serieSelected}
        episodeSelected={episodeSelected}
        series={series}
        episodes={episodes}
        onSubmit={onSubmit}
      />
    );
  }
}

export default Container;
