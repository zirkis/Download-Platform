const JSONAPISerializer = require('jsonapi-serializer').Serializer;

export const LinkSerializer = new JSONAPISerializer('links', {
  attributes: ['email', 'password']
});