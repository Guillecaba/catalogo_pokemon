/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Catalogo from './containers/Catalogo/Catalogo';
import Detail from './containers/Detail/Detail';
import Toolbar from './components/Toolbar/Toolbar';

const App = () => {
  return (
    <BrowserRouter>
      <Toolbar />
      <Switch>
        <Route path="/catalogo" component={Catalogo} />
        <Route path="/detalle/:id" exact component={Detail} />
      </Switch>
      <Redirect from="/" to="/catalogo" />
    </BrowserRouter>
  );
};

export default App;
