
class Websocket{
    constructor() {

    }
    setupSocket() {
        this.socket = new WebSocket('ws://34.65.135.40:8080/');
    }

}



export function createLobby(callback) {
    fetch("http://34.65.135.40:8080/createLobby")
        .then(e => e.text())
        .then(callback);
}