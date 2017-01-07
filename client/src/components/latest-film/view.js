import React, {Component} from 'react';
import {Link} from 'react-router';
import {Grid, Image, Card} from 'semantic-ui-react';

import DateHelper from '../../helpers/date';

class View extends Component {
  render() {
    console.log('coucou');
    let cards = [];
    const content = [];
    const films = this.props.films;
    if (!films) {
      return null;
    }
    let nbMaxFilms = films.length < 8 ? films.length : 8;
    for (let i=0; i < nbMaxFilms; i++) {
      const link = `/film/${films[i].id}`;
      cards.push(
        <Grid.Column key={cards.length}>
          <Link to={link}>
            <Card >
              <Image src={films[i].attributes.posterLink} />
              <Card.Content>
                <Card.Header>{films[i].attributes.name}</Card.Header>
                <Card.Meta>
                  Added on:
                  <div>
                    <DateHelper date={films[i].attributes.addedAt}/>
                  </div>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Link>
        </Grid.Column>
      );
      if (cards.length % 4 === 0) {
        content.push(
          <Grid.Row columns={4} key={content.length}>
            {cards}
          </Grid.Row>
        );
        cards = [];
      }
    }
    if (cards) {
      content.push(
        <Grid.Row columns={4} key={content.length}>
          {cards}
        </Grid.Row>
      );
    }
    return (
      <Grid>
        {content}
      </Grid>
    )
  }
}

export default View;
