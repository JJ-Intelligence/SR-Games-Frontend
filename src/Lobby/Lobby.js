import HostLobby from "./HostLobby";
import PlayerLobby from "./PlayerLobby";
import React from "react";
import {withRouter} from 'react-router-dom';
import {WebsocketHandler} from "../Comms/Websocket";
import {Button} from "@material-ui/core";
import TicTacToe from "../Games/TicTacToe/TicTacToe";

export default withRouter(props => <Lobby {...props}/>);

class Lobby extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lobby: this.findLobbyID(),
            game: null
        }
        this.websocket = new WebsocketHandler();
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

        this.websocket.addListener("LobbyDoesNotExistResponse", () => {
            this.props.history.push("/invalid-lobby/" + this.state.lobby);
        });

        this.websocket.addListener("LobbyStartGameBroadcast", content => {
            this.setState({"game": content.game})
        });

        this.websocket.setupSocket(this.state.lobby, this.props.playerID);
        console.log("Joined lobby")
    }

    componentWillUnmount() {
        // Close the websocket connection once the player leaves the lobby
        this.websocket.close()
    }

    render() {
        let gameButton;
        switch (this.state.game) {
            case null:
                if (this.props.isHost) {
                    gameButton = (<div>
                        <HostLobby websocket={this.websocket}/>
                    </div>)
                } else {
                    gameButton = (<div>
                        <PlayerLobby websocket={this.websocket}/>
                    </div>)
                }
                break;
            case "tictactoe":
                gameButton = <TicTacToe/>
                break;
            default:
                gameButton = <div>Game not supported yet :(</div>
        }

        return <div>
            <Button
                style={{fontWeight: "bold", fontFamily: "Monda"}}
                onClick={e => {
                    this.props.history.push("/")
                }}
            >
                Home
            </Button>;
            {gameButton}
        </div>

    }
}