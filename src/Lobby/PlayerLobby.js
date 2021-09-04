import PlayerList from "./PlayerList";
import React, {useRef} from "react";
import Popup from "reactjs-popup";


// Lobby page for regular players
export default class PlayerLobby extends React.Component {
    constructor(props) {
        super(props);
        this.websocket = props.websocket;

        this.popupRef = React.createRef();
    }

    componentDidMount() {
        this.websocket.addListener("LobbyClosedBroadcast", () => {
            this.popupRef.current.open()
        })
    }

    render() {

        return <div>
            <h2>Player Lobby</h2>
            <PlayerList websocket={this.websocket}/>
            <Popup open={this.popupRef.current.open()} closeOnDocumentClick>
                ref={this.popupRef}
                <div className="modal">
                    The host left so the lobby has been closed
                    Press OK to return to the main menu.
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