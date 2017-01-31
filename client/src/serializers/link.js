import Promise from 'bluebird';
import {Serializer, Deserializer} from 'jsonapi-serializer';

const _Deserializer = new Deserializer({keyForAttribute: 'camelCase'});
_Deserializer.deserialize = Promise.promisify(_Deserializer.deserialize);

export const LinkSerializer = {
  serialize(data) {
    return new Serializer('links', {
      keyForAttribute: 'camelCase',
      attributes: [
        'host',
        'link',
        'quality',
        'language',
        'uploader'
      ],
      typeForAttribute(attribute, data) {
        // sometimes this returns undefined
        return data.customType;
      },
      uploader: {
        ref: 'id',
        included: false
      }
    }).serialize(data);
  },
  deserialize(data) {
    return _Deserializer
      .deserialize(data);
  }
};
