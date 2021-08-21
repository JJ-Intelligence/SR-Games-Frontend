import React from "react";
import {Redirect} from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.websocket = props.websocket;
        this.state = { players: [] };

        this.websocket.addListener("LobbyPlayerListBroadcast", e => {
            this.updatePlayers(e.playerIDs)
        })
    }

    updatePlayers(players) {
        this.setState({players})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                {[...this.state.players].map((user, userIndex) => (
                    <div>Player {{user}}</div>
                ))}
            </div>
        );
    }
}
export default Home;
