const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

export const UserSerializer = {
  serialize(data) {
    return new JSONAPISerializer('users', {
      attributes: [
        'email',
        'password'
      ]
    }).serialize(data);
  },
  deserialize(data) {
    return new JSONAPIDeserializer()
      .deserialize(data, (err, json) => {

      });
  }
};

