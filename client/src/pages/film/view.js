import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import {Image} from 'semantic-ui-react';
import {Button} from 'semantic-ui-react';
import DocumentTitle from 'react-document-title';

import styles from './styles.css';
import DateHelper from '../../helpers/date'

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
                <h3>Date de sortie : </h3>
                <DateHelper date={film.attributes.productionDate}/>
              </div>
              <div>
                <h3>Acteurs : </h3>
                {film.attributes.actors[0]}, {film.attributes.actors[1]}, {film.attributes.actors[2]}
              </div>
              <br/>
              <div>
                <h3>Synopsis : </h3>
                {film.attributes.description}
              </div><br/>
              <div>
                <h3>Langue : </h3> {film.attributes.language}
              </div>
              <br/>
              <div>
                <h3>Format : </h3> DVD</div><br/>
              <div>
                <h3>Ajouté le : </h3>
                <DateHelper date={film.attributes.addedAt}/>
              </div>
            </div>
            <hr/>
            <p styleName="download"><Button color='red' size='massive'>DOWNLOAD</Button></p>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default View;
