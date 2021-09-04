import HostLobby from "./HostLobby";
import PlayerLobby from "./PlayerLobby";
import React from "react";
import {withRouter} from 'react-router-dom';
import {WebsocketHandler} from "../Comms/Websocket";
import {Button} from "@material-ui/core";

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
        this.websocket.addListener("LobbyClosedBroadcast", () => {
            this.props.history.push("/invalid-lobby/" + this.state.lobby);
        })
        this.websocket.addListener("LobbyDoesNotExistResponse", () => {
            this.props.history.push("/invalid-lobby/" + this.state.lobby);
        })
        this.websocket.setupSocket(this.state.lobby, this.props.playerID)
        console.log("Joined lobby")
    }

    componentWillUnmount() {
        // Close the websocket connection once the player leaves the lobby
        this.websocket.close()
    }

    render() {
        const homeButton =
            <Button
                style={{fontWeight: "bold", fontFamily: "Monda"}}
                onClick={e => {
                    this.props.history.push("/")
                }}
            >Home</Button>;

        if (this.props.isHost) {
            return <div>
                {homeButton}
                <HostLobby websocket={this.websocket}/>
            </div>
        } else {
            return <div>
                {homeButton}
                <PlayerLobby websocket={this.websocket}/>
            </div>
        }
    }
}