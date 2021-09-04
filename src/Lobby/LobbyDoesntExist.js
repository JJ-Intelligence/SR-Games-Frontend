import React from "react";
import {Button} from "@material-ui/core";
import {withRouter} from "react-router-dom";


export default withRouter(props => <LobbyDoesntExist {...props}/>);

class LobbyDoesntExist extends React.Component {
    constructor(props) {
        super(props);
    }

    // Extra the Lobby ID from the URL's path
    findLobbyID() {
        const location = this.props.location.pathname
        console.log(location)
        const locs = location.split("/")
        return locs[locs.length-1]
    }

    render() {
        return <div>
            <h2>The lobby "{this.findLobbyID()}" doesn't exist or was closed :( </h2>
            <Button
                style={{fontWeight: "bold", fontFamily: "Monda"}}
                onClick={e => {
                    this.props.history.push("/")
                }}
            >Return to Home</Button>;
        </div>
    }
}