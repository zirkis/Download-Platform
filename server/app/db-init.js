'use strict';
const User = require('./model/common/users').model;
const Film = require('./model/common/films').model;

const Link = require('./model/common/links').model;
//const Serie =  require('../model/common/series').model;
//const Episode = require('../model/common/episodes').model;

const db = {
  init() {
    User.findOne({email: 'Admin'}, (err, user) => {
      if (err) {
        console.log(err);
      }
      if (!user) {
        const admin = new User({
          email: 'Admin',
          password: 'admin'
        });
        admin.save();
      }
    });

    // To populate the database in order to test
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

    Promise.all(promisesLink)
      .then(res => {
        console.log(res);
        const films = [];
        const promisesFilm = [];
        films.push(new Film({
          name: 'Le Fondateur',
          description: `Dans les années 50, Ray Kroc rencontre les frères McDonald qui tiennent un restaurant de burgers en Californie. Bluffé par leur concept, Ray leur propose de franchiser la marque et va s'en emparer pour bâtir l'empire que l'on connaît aujourd'hui.`,
          actors: [
            'Michael Keaton',
            'Linda Cardellini'
          ],
          posterLink: 'http://fr.web.img3.acsta.net/r_1920_1080/pictures/16/11/18/17/49/128537.jpg',
          productionDate: new Date(2016,1),
          downloadLinks: [res[0]._id,res[1]._id],
          director: 'John Lee Hancock',
          country: 'USA',
          length: 121
        }));

        films.push(new Film({
          name: 'Rogue One',
          description: `Situé entre les épisodes III et IV de la saga Star Wars, le film nous entraîne aux côtés d’individus ordinaires qui, pour rester fidèles à leurs valeurs, vont tenter l’impossible au péril de leur vie. Ils n’avaient pas prévu de devenir des héros, mais dans une époque de plus en plus sombre, ils vont devoir dérober les plans de l’Étoile de la Mort, l’arme de destruction ultime de l’Empire.`,
          actors: [
            'Felicity Jones',
            'Diego Luna',
            'Ben Mendelsohn'
          ],
          posterLink: 'http://fr.web.img6.acsta.net/r_1920_1080/pictures/16/10/19/14/33/069648.jpg',
          productionDate: new Date(2016,1),
          downloadLinks: res[0]._id,
          director: 'Gareth Edwards',
          country: 'USA',
          length: 141
        }));

        films.push(new Film({
          name: 'Assassin\'s Creed',
          description: `Grâce à une technologie révolutionnaire qui libère la mémoire génétique, Callum Lynch revit les aventures de son ancêtre Aguilar, dans l’Espagne du XVe siècle.  Alors que Callum découvre qu’il est issu d’une mystérieuse société secrète, les Assassins, il va assimiler les compétences dont il aura besoin pour affronter, dans le temps présent, une autre redoutable organisation : l’Ordre des Templiers.`,
          actors: [
            'Michael Fassbender',
            'Marion Cotillard',
            'Jeremy Irons'
          ],
          posterLink: 'http://fr.web.img3.acsta.net/r_1920_1080/pictures/16/10/28/13/54/576646.jpg',
          productionDate: new Date(2016,1),
          downloadLinks: res[0]._id,
          director: 'Justin Kurzel',
          country: 'USA',
          length: 113
        }));

        films.push(new Film({
          name: 'Demain tout commence',
          description: `Samuel vit sa vie sans attaches ni responsabilités, au bord de la mer sous le soleil du sud de la France, près des gens qu’il aime et avec qui il travaille sans trop se fatiguer. Jusqu’à ce qu’une de ses anciennes conquêtes lui laisse sur les bras un bébé de quelques mois, Gloria : sa fille ! Incapable de s’occuper d’un bébé et bien décidé à rendre l’enfant à sa mère, Samuel se précipite à Londres pour tenter de la retrouver, sans succès. 8 ans plus tard, alors que Samuel et Gloria ont fait leur vie à Londres et sont devenus inséparables, la mère de Gloria revient dans leur vie pour récupérer sa fille…`,
          actors: [
            'Omar Sy',
            'Clémence Poésy',
            'Gloria Colston'
          ],
          posterLink: 'http://fr.web.img6.acsta.net/r_1920_1080/pictures/16/09/30/14/48/139893.jpg',
          productionDate: new Date(2016,1),
          downloadLinks: res[0]._id,
          director: 'Hugo Gélin',
          country: 'France',
          length: 104
        }));

        films.forEach(film => {
          promisesFilm.push(film.save());
        });
        return Promise.all(promisesFilm);
      })
      .then(() => {
        console.log('Films saved successfully');
      })
      .catch(err => {
        console.log(err);
      });
  }
};

module.exports = db;
