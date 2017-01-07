'use strict';

const UsersInit = require('./users').init;
const LinksInit = require('./links').init;
const FilmsInit = require('./films').init;
const SeriesInit =  require('./series').init;
const EpisodeInit = require('./episodes').init;

const db = {
  init() {
    // To populate the database in order to test
    let allLinks = null;
    let allEpisodes = null;
    UsersInit()
      .then(() => {
        console.log('Users saved successfully');
        return LinksInit();
      })
      .then(links => {
        console.log('Links saved successfully');
        allLinks = links;
        return FilmsInit(allLinks);
      })
      .then(() => {
        console.log('Films saved successfully');
        return EpisodeInit(allLinks);
      })
      .then(episodes => {
        console.log('Episodes saved successfully');
        allEpisodes = episodes;
        return SeriesInit(allEpisodes);
      })
      .then(() => {
        console.log('Series saved successfully');
      })
      .catch(err => {
        console.log(err);
      });
  }
};

module.exports = db;
