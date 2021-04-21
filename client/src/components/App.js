import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Home from './Home';
import Map from './Map';
import Graph from './Graph';
import Survey from './Survey';

function App() {
  return (
    <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Home />}
      />
      <Route
        path="/home"
        render={() => <Home />}
      />
      <Route
        path="/map"
        render={() => <Map />}
      />
      <Route
        path="/graph"
        render={() => <Graph />}
      />
      <Route
        path="/survey"
        render={() => <Survey />}
      />
    </Switch>
  </Router>
  );
}

export default App;
