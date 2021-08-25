import HostLobby from "./HostLobby";
import PlayerLobby from "./PlayerLobby";
import React from "react";
import {withRouter} from 'react-router-dom';
import {WebsocketHandler} from "../Comms/Websocket";

export default withRouter(props => <Lobby {...props}/>);

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lobby: this.findLobbyID() };
        this.websocket = new WebsocketHandler();
    }

    findLobbyID() {
        const location = this.props.location.pathname;
        console.log(location)
        const locs = location.split("/");
        return locs[locs.length-1]
    }

    joinLobby(){
        let lobby = this.state.lobby;
        console.log("Joining lobby", lobby);

        this.websocket.setupSocket(lobby, this.props.playerID);
        console.log("Websocket connection successful");
    }

    render() {
        this.joinLobby()
        if (this.props.isHost) {
            return <HostLobby websocket={this.websocket}/>
        } else {
            return <PlayerLobby websocket={this.websocket}/>
        }
    }
}