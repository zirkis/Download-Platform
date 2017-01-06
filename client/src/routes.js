import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';

import store from './store';

// Layout
import AppLayout from './layouts/app/container';
import ProtectedLayout from './layouts/protected/container';
import AddLayout from './layouts/add/container';

// Public pages
import Home from './pages/home/container';
import Films from './pages/films/container';
import Film from './pages/film/container';
import Series from './pages/series/container';
import Serie from './pages/serie/container';
import Login from './pages/login/container';

// Private pages
import Profile from './pages/profile/container';
import AddFilm from './pages/add/film/container';
import AddSerie from './pages/add/serie/container';
import AddEpisode from './pages/add/episode/container';
import AddLink from './pages/add/link/container';

import _404 from './pages/404/view';

const history = syncHistoryWithStore(browserHistory, store);

export default(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppLayout}>
        <IndexRoute component={Home} />
        <Route path="films" component={Films}/>
        <Route path="film/:id" component={Film} />
        <Route path="series" component={Series}/>
        <Route path="serie/:id" component={Serie} />
        <Route path="login" component={Login}/>
        <Route component={ProtectedLayout}>
          <Route path="profile" component={Profile}/>
          <Route path="add" component={AddLayout}>
            <Route path="film" component={AddFilm}/>
            <Route path="serie" component={AddSerie}/>
            <Route path="episode" component={AddEpisode}/>
            <Route path="link" component={AddLink}/>
          </Route>
        </Route>
        <Route path="*" component={_404}/>
      </Route>
    </Router>
  </Provider>
);
