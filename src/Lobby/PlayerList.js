import React from "react";
import {Redirect} from "react-router-dom";

// Handles and displays the list of players currently in the lobby
class PlayerList extends React.Component {
    constructor(props) {
        super(props);
        this.websocket = props.websocket;
        this.state = { players: [] };

        this.websocket.addListener("LobbyPlayerListBroadcast", contents => {
            this.updatePlayers(contents.playerIDs)
        })
    }

    // Update the list of players
    updatePlayers(players) {
        this.setState({players: [...players]})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                {this.state.players.map((user, i) => (
                    <div key={i}>Player {{user}}</div>
                ))}
            </div>
        );
    }
}
export default PlayerList;
