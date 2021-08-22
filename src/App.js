import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Home/Home";
import Lobby from "./Lobby/Lobby";
import {createPlayerRequest} from "./Comms/Requests";


export default class App extends React.Component {
    constructor(props) {
        super(props);

        createPlayerRequest(playerID => {
          console.log("Player ", playerID)
          this.setState({playerID})
        });

        this.state = { isHost: false, playerID: null };
    }

    render() {
      return (
          <Router>
            <div>
              <Switch>
                <Route path="/lobby/*">
                  <Lobby
                      isHost={this.state.isHost}
                      playerID={this.state.playerID}
                  />
                </Route>
                <Route path="/">
                  <Home
                      setHost={isHost => {
                        this.setState({isHost})
                      }}
                      playerID={this.state.playerID}
                  />
                </Route>
              </Switch>
            </div>
          </Router>
      );
    }
}