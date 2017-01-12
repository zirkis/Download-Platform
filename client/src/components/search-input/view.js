import React, {Component} from 'react';
import {Icon, Button, Input, Image, List} from 'semantic-ui-react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

@CSSModules(styles)
class View extends Component {
  componentWillMount() {
    this.resetComponent()
  }
  onBlur() {
    setTimeout(() => {
      this.setState({
        ...this.state,
        focused: false
      })
    }, 500);
  }
  onFocus() {
    this.setState({
      ...this.state,
      focused: true
    })
  }
  resetComponent() {
    this.setState({
      search: '',
      focused: false,
      results: null
    });
  }
  updateInputValue(evt) {
    const search = evt.target.value;
    const {media} = this.props;
    if (!media) {
      return;
    }
    const regex = new RegExp(`.*${search}.*`, 'i');
    const match = media.filter(m => m.name.match(regex)).splice(0,3);
    const results =
      (search !== '') && (match.length) ? match : null;
    this.setState({
      ...this.state,
      search,
      results
    });
  }
  search() {
    if (this.state.search) {
      this.resetComponent();
      this.props.redirect(`/search/${this.state.search}`);
    }
  }
  render() {
    const {search, results, focused} = this.state;
    const {redirect} = this.props;
    let displayResults = [];
    if (results) {
      results.forEach(result => {
        displayResults.push(
          <List.Item key={displayResults.length}
                     onClick={() => redirect(`/${result.type}/${result.id}`)}>
            <Image avatar src={result.image} />
            <List.Content>
              <List.Header>{result.name}</List.Header>
            </List.Content>
          </List.Item>
        )
      })
    }
    return (
      <div styleName="container">
        {/*<Input*/}
          {/*ref="searchInput"*/}
          {/*action={*/}
            {/*<Button icon onClick={() => {this.search()}}>*/}
              {/*<Icon name='search'/>*/}
            {/*</Button>*/}
          {/*}*/}
          {/*value={search}*/}
          {/*onChange={evt => {this.updateInputValue(evt)}}*/}
          {/*placeholder='Search...'/>*/}
        {/*{results && focused &&*/}
        {/*<div styleName="results">*/}
          {/*<List divided verticalAlign='middle'>*/}
            {/*{displayResults}*/}
          {/*</List>*/}
        {/*</div>*/}
        {/*}*/}
      </div>

    )
  }
}

export default View;
