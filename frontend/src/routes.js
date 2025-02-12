import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewIncident from './pages/NewIncident';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/incidents/new" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
}
