import React from "react";
import { Redirect } from "react-router-dom";
import {Button, TextField} from "@material-ui/core";
import {WebsocketHandler} from "../Comms/Websocket";
import {createLobbyRequest} from "../Comms/Requests";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirect: null, lobby: null };
    }

    setLobby(id) {
        this.setState({lobby: id})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <h2>Home</h2>
                <div>
                    <Button
                        style={{fontWeight: "bold", fontFamily: "Monda"}}
                        onClick={e => {
                                createLobbyRequest(lobby => {
                                    this.props.setHost(true);
                                    this.setState({redirect: "/lobby/" + lobby})
                                });
                            }
                        }
                    >
                        Create Lobby
                    </Button>
                </div>
                <div>
                    <TextField id="standard-basic" label="Lobby ID"
                               onChange= {e=>this.setLobby(e.target.value) } />
                    <Button
                        style={{fontWeight: "bold", fontFamily: "Monda"}}
                        onClick={e => {
                                this.props.setHost(false);
                                this.setState({redirect: "/lobby/" + this.state.lobby})
                            }
                        }
                    >
                        Join lobby
                    </Button>
                </div>
            </div>
        );
    }
}


