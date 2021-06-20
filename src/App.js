import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Lobby from "./Lobby/Lobby";
import Home from "./Home/Home";

export default function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/lobby/*">
              <Lobby />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}