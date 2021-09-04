import React from "react";
import { Redirect } from "react-router-dom";
import {Button, TextField} from "@material-ui/core";
import {createLobbyRequest} from "../Comms/Requests";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";



class HomeWithoutRouter extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

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
                                createLobbyRequest(this.props.playerID, lobby => {
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
                                this.props.history.push("/lobby/" + this.state.lobby)
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

const Home = withRouter(HomeWithoutRouter);
export default Home;


