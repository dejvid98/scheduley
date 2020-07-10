import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';

const App = () => {
  return (
    <Switch>
      <Route exact={true} path='/' component={LandingPage} />
      <Route exact={true} path='/' component={LandingPage} />
    </Switch>
  );
};

export default App;
