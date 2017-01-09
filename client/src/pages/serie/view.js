import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import DocumentTitle from 'react-document-title';
import {Image} from 'semantic-ui-react';

import styles from './styles.css';
import DateHelper from '../../helpers/date';
import DownloadBar from '../../components/downloadbar/container';

@CSSModules(styles)
class View extends Component {
  render() {
    const serie = this.props.serie;
    console.log(serie);
    return (
      <DocumentTitle title='Serie'>
        <div styleName='page'>
          <div styleName='container'>
            <h1 styleName="title">{serie.attributes.name}</h1>
            <hr/>
            <card styleName="serie_poster">
              <Image src={serie.attributes.posterLink} />
            </card>
            <div styleName="info">
              <div>
                <h3>Release :&nbsp;</h3>
                <DateHelper date={serie.attributes.productionDate}/>
              </div>
              <div>
                <h3>Director :&nbsp;</h3>
                {serie.attributes.director}
              </div><br/>
              <div>
                <h3>Actors :&nbsp;</h3>
                {serie.attributes.actors[0]}, {serie.attributes.actors[1]}, {serie.attributes.actors[2]}
              </div>
              <br/>
              <div>
                <h3>Country :&nbsp;</h3>
                {serie.attributes.country}
              </div>
              <br/>
              <div>
                <h3>Synopsis :&nbsp;</h3>
                {serie.attributes.description}
              </div>
              <br/>
              <div>
                <h3>Added on :&nbsp;</h3>
                <DateHelper date={serie.attributes.addedAt}/>
              </div>
            </div>
            <hr/>
            <DownloadBar links={serie.relationships.episodes}/>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default View;
