import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector, change} from 'redux-form';

import Form from './form';
import {getSeries} from '../../../actions/series/get-series';
import {getSerieEpisode} from '../../../actions/series/get-serie-episodes';

@connect(store => {
    const selector = formValueSelector('add_link');
    return {
      serieSelected: selector(store, 'serieSelected') || false,
      episodeSelected: selector(store, 'episode') || false,
      series: store.series.series,
      episodes: store.episodes.episodes,
      user: store.user
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
      },
      setUploaderAction: uploaderId => {
        const uploader = {id: uploaderId, customType: 'users'};
        dispatch(change('add_link', 'uploader', uploader));
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
    const {getSeriesAction} = this.props;
    getSeriesAction()
      .then(() => {
        this.setState({loaded: true});
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
  componentDidMount() {
    const {user} = this.props;
    this.props.setUploaderAction(user.id);
  }
}

export default Container;
