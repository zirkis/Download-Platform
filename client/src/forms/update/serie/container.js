import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form';

import Form from './form';
import {getSeries} from '../../../actions/series/get-series';

@connect(store => {
    const selector = formValueSelector('update_serie');
    return {
      isSerieSelected: selector(store, 'name') || false,
      posterLink: selector(store, 'posterLink'),
      series: store.series.series
    }
  },
  dispatch => {
    return {
      getSeriesAction: () => {
        return dispatch(getSeries());
      }
    };
  })

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      serie: null,
    };
  }
  componentWillMount() {
    return this.props.getSeriesAction()
      .then(() => {
        this.setState({loaded: true});
      });
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    const {onSubmit, series, isSerieSelected, posterLink} = this.props;
    return (
      <Form
        series={series}
        posterLink={posterLink}
        isSerieSelected={isSerieSelected}
        onSubmit={onSubmit}
      />
    );
  }
}

export default Container;
