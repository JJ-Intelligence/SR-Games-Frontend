
export class WebsocketHandler {
    constructor() {
        this.sendMessage = this.sendMessage.bind(this);
        this.listeners = {};
    }

    setupSocket(lobbyCode) {
        this.socket = new WebSocket('wss://sr-games-backend.herokuapp.com/');
        this.socket.onmessage = event => {console.log(event.data)}
        let sendMessage = this.sendMessage;
        this.socket.onopen = () => sendMessage({type: "LobbyJoinRequest", code:lobbyCode});

        this.socket.addEventListener('message', function (event) {
            event.json().then(message => {
                    this.listeners[message.type](message);
                    console.log('Message from server ', event.json);
                }
            )
        });
    }

    sendMessage(message) {
        this.socket.send(JSON.stringify(message))
    }

    addListener(type, callback) {
        this.listeners[type] = callback;
    }
}
