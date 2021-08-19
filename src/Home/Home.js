import React from "react";
import { Redirect } from "react-router-dom";
import {Button, TextField} from "@material-ui/core";
import {createLobby, WebsocketHandler} from "../Comms/Websocket";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.websocket = new WebsocketHandler();
        this.state = { redirect: null };

        this.joinLobby = this.joinLobby.bind(this);
    }

    joinLobby(){
        // Get the lobby ID
        console.log("creating lobby")
        this.websocket.setupSocket();
        createLobby(lobby => {
            this.setState({ redirect: "/lobby/" + lobby});
            console.log(lobby);
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        console.log(123);
        return (
            <div>
                <h2>Home</h2>
                <div>
                    <Button
                        style={{fontWeight: "bold", fontFamily: "Monda"}}
                        onClick={this.joinLobby}
                    >
                        Create Lobby
                    </Button>
                </div>
                <div>
                    <TextField id="standard-basic" label="Lobby ID" />
                    <Button
                        style={{fontWeight: "bold", fontFamily: "Monda"}}
                        onClick={this.joinLobby}
                    >
                        Join lobby
                    </Button>
                </div>
            </div>
        );
    }
}
export default Home;


