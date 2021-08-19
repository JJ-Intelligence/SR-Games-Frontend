
export class WebsocketHandler{
    constructor() {
        this.sendMessage = this.sendMessage.bind(this);
    }
    setupSocket(lobbyCode) {
        this.socket = new WebSocket('wss://sr-games-backend.herokuapp.com/');
        this.socket.onmessage = event => {console.log(event.data)}
        let sendMessage = this.sendMessage;
        this.socket.addEventListener('open', function (event) {
            sendMessage({type: "Connect", code:lobbyCode});
        });
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