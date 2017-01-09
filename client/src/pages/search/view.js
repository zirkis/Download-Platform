import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import DocumentTitle from 'react-document-title';
import {Grid, Image} from 'semantic-ui-react'

import PosterArea from '../../components/poster-area/container';
import styles from './styles.css';

@CSSModules(styles)
class View extends Component {
  render() {
    return (
      <DocumentTitle title='Home'>
        <div styleName='page'>
          <h1 styleName="center">Results</h1>
          <Grid>
            <Grid.Row>
              <Grid.Column width={3}>
              </Grid.Column>
              <Grid.Column width={10}>
                <h2>
                  <Image styleName="imgTitles"
                         src='http://s3.amazonaws.com/libapps/accounts/89359/images/film-reel-and-clapperboard.jpg'/>
                  Movies
                </h2>
                <PosterArea
                  media={this.props.films}
                  typeMedia='film'
                  maxDisplay={8}
                />
                <hr/>
                <h2>
                  <Image styleName="imgTitles"
                         src='http://iip.lu/wp-content/uploads/sites/156/2016/04/15700070751_88d83d38fd_o.png'/>
                  Series
                </h2>
                <PosterArea
                  media={this.props.series}
                  typeMedia='serie'
                  maxDisplay={8}
                />
              </Grid.Column>
              <Grid.Column width={3}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </DocumentTitle>
    );
  }
}

export default View;
