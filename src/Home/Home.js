import React from "react";
import { Redirect } from "react-router-dom";
import {Button, TextField} from "@material-ui/core";
import {createLobby, WebsocketHandler} from "../Comms/Websocket";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.websocket = new WebsocketHandler();
        this.state = { redirect: null, lobby: null };

        this.joinLobby = this.joinLobby.bind(this);
        this.createLobby = this.createLobby.bind(this);
        this.setLobby = this.setLobby.bind(this);
    }

    joinLobby(){
        let lobby = this.state.lobby;
        console.log("Joining lobby", lobby);
        this.setState({ redirect: "/lobby/" + lobby});
        console.log("Lobby ID =",lobby);
        this.websocket.setupSocket(lobby);
        console.log("Websocket connection successful");
    }

    createLobby(){
        console.log("creating lobby")
        createLobby(lobby => {
            this.setLobby(lobby)
            this.joinLobby()
        });
    }

    setLobby(id) {
        this.setState({lobby:id})
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
                        onClick={this.createLobby}
                    >
                        Create Lobby
                    </Button>
                </div>
                <div>
                    <TextField id="standard-basic" label="Lobby ID" onChange= {e=>this.setLobby(e.target.value) } />
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


