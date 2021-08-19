
class Websocket{
    constructor() {

    }
    setupSocket() {
        this.socket = new WebSocket('ws://sr-games-backend.herokuapp.com/');
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