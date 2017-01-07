import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import {Image} from 'semantic-ui-react';
import DocumentTitle from 'react-document-title';

import styles from './styles.css';
import DateHelper from '../../helpers/date';
import DownloadBar from '../../components/downloadbar/container';

@CSSModules(styles)
class View extends Component {
  render() {
    const film = this.props.film;
    if (!film) {
      return 'COuCOU';
    }
    return (
      <DocumentTitle title='Film'>
        <div styleName='page'>
          <div styleName='container'>

            <h1 styleName="title">{film.attributes.name}</h1>
            <hr/>
            <card styleName="film_poster">
              <Image src={film.attributes.posterLink} />
            </card>
            <div styleName="film_info">
              <div>
                <h3>Release :&nbsp;</h3>
                <DateHelper date={film.attributes.productionDate}/>
              </div>
              <div>
                <h3>Director :&nbsp;</h3>
                {film.attributes.director}
              </div><br/>
              <div>
                <h3>Actors :&nbsp;</h3>
                {film.attributes.actors[0]}, {film.attributes.actors[1]}, {film.attributes.actors[2]}
              </div>
              <br/>
              <div>
                <h3>Country :&nbsp;</h3>
                {film.attributes.country}
              </div>
              <br/>
              <div>
                <h3>Synopsis :&nbsp;</h3>
                {film.attributes.description}
              </div>
              <br/>
              <div>
                <h3>Length :&nbsp;</h3>
                {film.attributes.length}min
              </div>
              <br/>
              <div>
                <h3>Added on :&nbsp;</h3>
                <DateHelper date={film.attributes.addedAt}/>
              </div>
            </div>
            <hr/>
            <p styleName="download">
            </p>
            <DownloadBar links={film.relationships.downloadLinks}/>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default View;
