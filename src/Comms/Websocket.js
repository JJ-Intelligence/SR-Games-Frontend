
export class WebsocketHandler {
    constructor() {
        this.sendMessage = this.sendMessage.bind(this);
        this.listeners = {};
    }

    setupSocket(lobbyID, playerID) {
        this.socket = new WebSocket('wss://sr-games-backend.herokuapp.com/');
        this.socket.onmessage = event => {console.log(event.data)}
        let sendMessage = this.sendMessage;
        this.socket.onopen = () => sendMessage(
            "LobbyJoinRequest",
            {playerID: playerID, lobbyID: lobbyID},
        );

        this.socket.addEventListener('message', event => {
            let message = event.data
            let listener = this.listeners[message.type]

            console.log('Message from server ', message);
            if (listener == undefined) {
                console.log("No listener for message type", message.type)
            } else {
                this.listeners[message.type](message);
            }
        });
    }

    sendMessage(type, contents) {
        this.socket.send(JSON.stringify({
            type: type,
            contents: contents
        }))
    }

    addListener(type, callback) {
        this.listeners[type] = callback;
    }
}
