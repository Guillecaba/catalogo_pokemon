import React from 'react';

import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

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
        <Redirect from="/" to="/catalogo" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
