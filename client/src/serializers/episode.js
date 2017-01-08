const JSONAPISerializer = require('jsonapi-serializer').Serializer;

export const EpisodeSerializer = new JSONAPISerializer('episodes', {
  attributes: ['email', 'password']
});