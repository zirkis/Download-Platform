const JSONAPISerializer = require('jsonapi-serializer').Serializer;

export const FilmSerializer = new JSONAPISerializer('films', {
  attributes: ['email', 'password']
});