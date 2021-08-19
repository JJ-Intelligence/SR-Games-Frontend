
class Websocket{
    constructor() {

    }
    setupSocket() {
        this.socket = new WebSocket('ws://sr-games-backend.herokuapp.com/');
    }

}



export function createLobby(callback) {
    fetch(
        "https://sr-games.herokuapp.com/https://sr-games-backend.herokuapp.com/createLobby",
        {mode: 'no-cors'})
        .then(e => e.text())
        .then(lobby => callback(lobby));
}