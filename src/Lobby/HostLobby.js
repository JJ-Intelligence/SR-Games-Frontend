import PlayerList from "./PlayerList";
import {Button} from "@material-ui/core";
import React from "react";


// Lobby page for the host
export default class HostLobby extends React.Component {
    constructor(props) {
        super(props);
        this.websocket = props.websocket;
    }

    render() {
        return <div>
            <h2>Host Lobby</h2>
            <PlayerList websocket={this.websocket}/>
            <Button
                onClick={e => {
                    this.props.history.push("/")
                }}
            >Start Game</Button>
        </div>
    }
}