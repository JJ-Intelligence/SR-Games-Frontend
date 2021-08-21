import PlayerList from "./PlayerList";
import React from "react";


export default class PlayerLobby extends React.Component {
    constructor(props) {
        super(props);
        this.websocket = props.websocket;
    }

    render() {
        return <div>
            <h2>Player Lobby</h2>
            <PlayerList websocket={this.websocket}/>
        </div>
    }
}