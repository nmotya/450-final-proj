import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Home from './Home';
import Map from './Map';
import Graph from './Graph';
import Survey from './Survey';
import ReactTooltip from "react-tooltip";


function App() {
  const [content, setContent] = useState("");

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
          render={() => {
            return (
              <>
                <Map setTooltipContent={setContent}/>
                <ReactTooltip html={true}>{content}</ReactTooltip>
              </>
            )
          }}

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
