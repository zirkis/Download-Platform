import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';

import {SerieSerializer} from '../../serializers/serie';

class View extends Component {
  render() {
    const data = {
      "data": [
        {
          "id": "5871600f2bda731fa4983d40",
          "type": "series",
          "attributes": {
            "name": "Breaking Bad",
            "posterLink": "http://images.amcnetworks.com/amc.com/wp-content/uploads/2010/12/breaking-bad-S5-400x600-compressedV1.jpg",
            "productionDate": "2008-01-31T23:00:00.000Z",
            "director": "Vince Gilligan",
            "country": "USA",
            "addedAt": "2017-01-08T13:22:09.129Z",
            "actors": [
              "Bryan Cranston",
              "Aaron Paul",
              "Anna Gunn"
            ],
            "description": "Walter White, 50, is a chemistry professor at a New Mexico high school. To support Skyler, his pregnant wife, and Walt Junior, his disabled son, he is forced to work doubly. His already morose daily becomes squarely black when he learns that he is suffering from an incurable cancer of the lungs. Doctors give him no more than two years to live. To quickly raise a lot of money to save his family, Walter sees only one solution: to use his chemistry knowledge to make and sell crystal meth, a synthetic drug that pays a lot. He proposes to Jesse, one of his former pupils become a small dealer of second zone, to team up with him. The improvised duo set up a mobile lab in an old camper van. This unexpected association will lead them into a series of comic and pathetic vicissitudes."
          },
          "links": {
            "self": "http://localhost:5002/api/series/5871600f2bda731fa4983d40"
          },
          "relationships": {
            "episodes": {
              "data": [
                {
                  "type": "episodes",
                  "id": "5871600f2bda731fa4983d3f"
                }
              ],
              "links": {
                "self": "http://localhost:5002/api/series/5871600f2bda731fa4983d40/relationships/episodes"
              }
            }
          }
        }
      ]
    };
    SerieSerializer.deserialize(data)
      .then(users => {
        console.log(users);
      });
    return (
      <DocumentTitle title='404 :p'>
        <div>
          404 not found
        </div>
      </DocumentTitle>
    );
  }
}

export default View;
