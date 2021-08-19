
export class WebsocketHandler{
    constructor() {

    }
    setupSocket() {
        this.socket = new WebSocket('wss://sr-games-backend.herokuapp.com/');
    }

}



export function createLobby(callback) {
    fetch(
        "https://sr-games-backend.herokuapp.com/createLobby")
        .then(response => response.text())
        .then((response) => {
            callback(response)
        })
}