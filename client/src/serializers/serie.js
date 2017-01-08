const JSONAPISerializer = require('jsonapi-serializer').Serializer;

export const SerieSerializer = new JSONAPISerializer('series', {
  attributes: [
    'name',
    'description',
    'posterLink',
    'productionDate',
    'actors',
    'director',
    'country'
  ]
});
