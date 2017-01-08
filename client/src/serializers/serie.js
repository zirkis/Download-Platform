import Promise from 'bluebird';
import {Serializer, Deserializer} from 'jsonapi-serializer';

const _Deserializer = new Deserializer({keyForAttribute: 'camelCase'});
_Deserializer.deserialize = Promise.promisify(_Deserializer.deserialize);

export const SerieSerializer = {
  serialize(data) {
    return new Serializer('series', {
      attributes: [
        'name',
        'description',
        'posterLink',
        'productionDate',
        'director',
        'actors',
        'country',
        'addedAt',
        'episodes'
      ]
    }).serialize(data);
  },
  deserialize(data) {
    return new _Deserializer
      .deserialize(data);
  }
};
