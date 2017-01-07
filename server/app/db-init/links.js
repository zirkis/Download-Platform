const Promise = require('bluebird');
const Link = require('./../model/common/links').model;

const initLinks = {
  init() {
    const links = [];
    const promisesLink = [];
    links.push(new Link({
      host: 'MegaUpload',
      link: 'http://www.megaupload.com',
      quality: '720p',
      language: 'VO',
      uploader: 'zirkis'
    }));
    links.push(new Link({
      host: 'FileShare',
      link: 'http://www.fileshare.com',
      quality: '1080p',
      language: 'VF',
      uploader: 'didi34'

    }));
    links.push(new Link({
      host: 'Pirate Bay',
      link: 'http://www.piratebay.com',
      quality: '4K',
      language: 'VOST',
      uploader: 'momo60'

    }));
    links.forEach(link => {
      promisesLink.push(link.save());
    });

    return Promise.all(promisesLink);
  }
};

module.exports = initLinks;
