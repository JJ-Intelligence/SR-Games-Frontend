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

    createLobby(){
        let lobby = this.state.lobby;
        console.log("Joining lobby", lobby);

        this.websocket.setupSocket(lobby, this.state.playerID);
        console.log("Websocket connection successful");
    }

    joinLobby(){
        let lobby = this.state.lobby;
        console.log("Joining lobby", lobby);

        this.websocket.setupSocket(lobby, this.state.playerID);
        console.log("Websocket connection successful");
    }

    render() {
        if (this.props.isHost) {
            this.createLobby();
            return <HostLobby websocket={this.websocket}/>
        } else {
            this.joinLobby()
            return <PlayerLobby websocket={this.websocket}/>
        }
    }
}