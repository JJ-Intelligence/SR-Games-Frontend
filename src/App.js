import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Home/Home";
import Lobby from "./Lobby/Lobby";
import {createPlayerRequest} from "./Comms/Requests";
import LobbyDoesntExist from "./Lobby/LobbyDoesntExist";



export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isHost: false, playerID: null };
    }

    componentDidMount() {
      // Create a new player
      createPlayerRequest(playerID => {
        console.log("Player ", playerID)
        this.setState({playerID})
      });
    }

    render() {
        if (this.state.playerID !== null) {
            return (
                <Router>
                    <div>
                        <Switch>
                            <Route path="/invalid-lobby/*">
                                <LobbyDoesntExist />
                            </Route>
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
        } else {
            return <div>Loading...</div>
        }
    }
}