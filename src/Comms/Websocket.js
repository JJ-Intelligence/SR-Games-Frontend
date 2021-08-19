
export class WebsocketHandler{
    constructor() {

    }
    setupSocket(lobbyCode) {
        this.socket = new WebSocket('wss://sr-games-backend.herokuapp.com/');
        this.socket.onmessage = event => {console.log(event.data)}
        this.sendMessage({type: "Connect", code:lobbyCode});
    }

    sendMessage(message) {
        this.socket.send(JSON.stringify(message))
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