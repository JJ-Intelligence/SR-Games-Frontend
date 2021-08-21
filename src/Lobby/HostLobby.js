import PlayerList from "./PlayerList";
import {Button} from "@material-ui/core";
import React from "react";


export default class HostLobby extends React.Component {
    constructor(props) {
        super(props);
        this.websocket = props.websocket;
    }

    render() {
        return <div>
            <h2>Host Lobby</h2>
            <PlayerList websocket={this.websocket}/>
            <Button>Start Game</Button>
        </div>
    }
}