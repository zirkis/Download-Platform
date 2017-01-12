import React, {Component} from 'react';
import {connect} from 'react-redux';
import View from './view';
import {getSerie} from '../../actions/serie/get-serie';

@connect(undefined,
  dispatch => {
    return {
      getSerieAction: id => {
        return dispatch(getSerie(id));
      }
    }
  })
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      serie: null
    };
  }
  componentWillMount() {
    const id = this.props.routeParams.id;
    return this.props.getSerieAction(id)
      .then(serie => {
        this.setState({
          loaded: true,
          serie
        });
      });
  }
  render() {
    if (!this.state.loaded || !this.state.serie) {
      return null;
    }
    return (
      <View serie={this.state.serie}/>
    );
  }
}

export default Container;
