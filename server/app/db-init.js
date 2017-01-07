'use strict';
const User = require('./model/common/users').model;
const Film = require('./model/common/films').model;
const Link = require('./model/common/links').model;
const Serie =  require('../model/common/series').model;
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
        films.push(new Film({
          name: "Passengers",
          description: `Alors que 5000 passagers endormis pour longtemps voyagent dans l’espace vers une nouvelle planète, deux d’entre eux sont accidentellement tirés de leur sommeil artificiel 90 ans trop tôt. Jim et Aurora doivent désormais accepter l’idée de passer le reste de leur existence à bord du vaisseau spatial. Alors qu’ils éprouvent peu à peu une indéniable attirance, ils découvrent que le vaisseau court un grave danger. La vie des milliers de passagers endormis est entre leurs mains…`,
          actors: [
            'Jennifer Lawrence',
            'Chris Pratt',
            'Michael Sheen'
          ],
          posterLink: 'http://fr.web.img2.acsta.net/r_1920_1080/pictures/16/12/14/16/45/405336.jpg',
          productionDate: new Date(2016,1),
          downloadLinks: res[0]._id,
          director: 'Morten Tyldum',
          country: 'USA',
          length: 129
        }));

        films.push(new Film({
          name: "Sully",
          description: `The true story of the US Airways pilot who saved his passengers by landing on the Hudson in 2009. On January 15, 2009, the world witnessed the "miracle over the Hudson" accomplished by Commander "Sully" Sullenberger: He managed to put his aircraft on the icy waters of the Hudson River, saving the lives of the 155 passengers on board. However, while Sully was hailed by public opinion and the media for his unprecedented achievement in the history of aviation, an investigation was opened, threatening to destroy his reputation and his career.`,
          actors: [
            'Tom Hanks',
            'Aaron Eckhart',
            'Laura Linney'
          ],
          posterLink: 'http://fr.web.img3.acsta.net/r_1920_1080/pictures/16/10/14/15/10/425022.jpg',
          productionDate: new Date(2016,1),
          downloadLinks: res[0]._id,
          director: 'Clint Eastwood',
          country: 'USA',
          length: 96
        }));

        films.push(new Film({
          name: "First Contact",
          description: `When mysterious ships from the depths of space pop up everywhere on Earth, a team of experts is gathered under the direction of linguist Louise Banks to try to understand their intentions. Faced with the enigma of their presence and their mysterious messages, the reactions in the world are extreme and humanity soon finds itself on the brink of an absolute war. Louise Banks and her team have very little time to find answers. To get them, the young woman will take a risk that could not only cost her life, but destroy the human race ...`,
          actors: [
            'Amy Adams',
            'Jeremy Renner',
            'Forest Whitaker'
          ],
          posterLink: 'http://fr.web.img4.acsta.net/r_1920_1080/pictures/16/10/24/15/52/414639.jpg',
          productionDate: new Date(2016,1),
          downloadLinks: res[0]._id,
          director: 'Denis Villeneuve',
          country: 'USA',
          length: 116
        }));

        films.push(new Film({
          name: "Fantastic Beasts and Where to Find Them",
          description: `New York, 1926. The world of sorcerers is in great danger. A mysterious force sows chaos in the streets of the city: the sorcerer community now risks being at the mercy of the Faithful of Salem, a fanatical group of Non-Maj '(American version of the "Muggle") determined to annihilate them. As for the formidable sorcerer Gellert Grindelwald, after having wreaked havoc in Europe, he disappeared ... and remains untraceable.`,
          actors: [
            'Eddie Redmayne',
            'Katherine Waterston',
            'Dan Fogler'
          ],
          posterLink: 'http://fr.web.img3.acsta.net/r_1920_1080/pictures/16/10/11/09/32/205295.jpg',
          productionDate: new Date(2016,1),
          downloadLinks: res[0]._id,
          director: 'David Yates',
          country: 'UK',
          length: 133
        }));

        films.push(new Film({
          name: "Monster Cars",
          description: `Monster Cars embarks on us to live the incredible adventure of an ordinary boy, Tripp, making friendship for an adorable monster, Critch. To escape the quiet life of his hometown, Tripp, a high school student, built a "Monster Car", 4x4 overpowered and oversized, from spare parts found in a broken. As a result of an accident near an oil drilling site, he discovers a strange and underground creature who has the taste and a certain talent for speed. Tripp may have found a way out of the city and won a friend who does not look like anyone.`,
          actors: [
            'Lucas Till',
            'Jane Levy',
            'Thomas Lennon'
          ],
          posterLink: 'http://fr.web.img6.acsta.net/r_1920_1080/pictures/16/11/29/12/35/270013.jpg',
          productionDate: new Date(2016,1),
          downloadLinks: res[0]._id,
          director: 'Chris Wedge',
          country: 'USA',
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

    Promise.all()
      .then(res => {
        console.log(res);
        const series = [];
        const promisesSerie = [];
        series.push(new Serie({
          name: "Breaking Bad",
          description: `Walter White, 50, is a chemistry professor at a New Mexico high school. To support Skyler, his pregnant wife, and Walt Junior, his disabled son, he is forced to work doubly. His already morose daily becomes squarely black when he learns that he is suffering from an incurable cancer of the lungs. Doctors give him no more than two years to live. To quickly raise a lot of money to save his family, Walter sees only one solution: to use his chemistry knowledge to make and sell crystal meth, a synthetic drug that pays a lot. He proposes to Jesse, one of his former pupils become a small dealer of second zone, to team up with him. The improvised duo set up a mobile lab in an old camper van. This unexpected association will lead them into a series of comic and pathetic vicissitudes.`,
          actors: [
            'Bryan Cranston',
            'Aaron Paul',
            'Anna Gunn'
          ],
          posterLink: 'http://images.amcnetworks.com/amc.com/wp-content/uploads/2010/12/breaking-bad-S5-400x600-compressedV1.jpg',
          productionDate: new Date(2008,1),
          director: "Vince Gilligan",
          country: 'USA'
        }));

        series.forEach(serie => {
          promisesSerie.push(serie.save());
        });
        return Promise.all(promisesSerie)
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
