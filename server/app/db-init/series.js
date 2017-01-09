const Promise = require('bluebird');
const Serie = require('./../model/common/series').model;

const initSeries = {
  init(episodes) {
    const series = [];
    const promisesSerie = [];
    series.push(new Serie({
      name: 'Breaking Bad',
      description: `Walter White, 50, is a chemistry professor at a New Mexico
       high school. To support Skyler, his pregnant wife, and Walt Junior, his
       disabled son, he is forced to work doubly. His already morose daily
       becomes squarely black when he learns that he is suffering from an
       incurable cancer of the lungs. Doctors give him no more than two years to
       live. To quickly raise a lot of money to save his family, Walter sees
       only one solution: to use his chemistry knowledge to make and sell
       crystal meth, a synthetic drug that pays a lot. He proposes to Jesse,
       one of his former pupils become a small dealer of second zone, to team
       up with him.`,
      actors: [
        'Bryan Cranston',
        'Aaron Paul',
        'Anna Gunn'
      ],
      posterLink: 'http://images.amcnetworks.com/amc.com/wp-content/uploads' +
      '/2010/12/breaking-bad-S5-400x600-compressedV1.jpg',
      productionDate: new Date(2008,1),
      director: 'Vince Gilligan',
      country: 'USA',
      episodes: [episodes[0]._id],
    }));

    series.forEach(serie => {
      promisesSerie.push(serie.save());
    });

    return Promise.all(promisesSerie);
  }
};

module.exports = initSeries;
