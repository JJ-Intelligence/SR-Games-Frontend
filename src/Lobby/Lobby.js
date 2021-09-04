import HostLobby from "./HostLobby";
import PlayerLobby from "./PlayerLobby";
import React from "react";
import {withRouter} from 'react-router-dom';
import {WebsocketHandler} from "../Comms/Websocket";

export default withRouter(props => <Lobby {...props}/>);

class Lobby extends React.Component {
    constructor(props) {
        super(props)
        this.state = { lobby: this.findLobbyID() }
        this.websocket = new WebsocketHandler()
    }

    // Extra the Lobby ID from the URL's path
    findLobbyID() {
        const location = this.props.location.pathname
        console.log(location)
        const locs = location.split("/")
        return locs[locs.length-1]
    }

    componentDidMount() {
        // Send a request for the player to join the lobby
        console.log("Joining lobby", this.state.lobby)
        this.websocket.setupSocket(this.state.lobby, this.props.playerID)
        console.log("Joined lobby")
    }

    componentWillUnmount() {
        // Close the websocket connection once the player leaves the lobby
        this.websocket.close()
    }

    render() {
        if (this.props.isHost) {
            return <HostLobby websocket={this.websocket}/>
        } else {
            return <PlayerLobby websocket={this.websocket}/>
        }
    }
}