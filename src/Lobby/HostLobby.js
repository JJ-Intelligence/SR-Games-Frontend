import PlayerList from "./PlayerList";
import {Button} from "@material-ui/core";
import React from "react";
import Popup from "reactjs-popup";
import "./Lobby.css";


// Lobby page for the host
export default class HostLobby extends React.Component {
    constructor(props) {
        super(props);
        this.websocket = props.websocket;

        this.popupRef = React.createRef();
    }

    componentDidMount() {
        this.websocket.addListener("LobbyStartGameResponse", content => {
            if (!content.status) {
                this.popupRef.current.open()
            }
        });
    }

    render() {
        return <div>
            <h2>Host Lobby</h2>
            <PlayerList websocket={this.websocket}/>
            <Button
                onClick={e => {
                    this.websocket.sendMessage("LobbyStartGameRequest", {
                        "game": "tictactoe"
                    });
                    // Redirecting should happen when response is received
                }}
            >Start Game</Button>

            <Popup
                ref={this.popupRef}
                closeOnDocumentClick={false}
                closeOnEscape={false}
                modal
            >

                <div className="modal">
                    Invalid game
                    <button
                        onClick={() => {
                            this.props.history.push("/")
                        }}
                    >OK</button>
                </div>
            </Popup>
        </div>
    }
}