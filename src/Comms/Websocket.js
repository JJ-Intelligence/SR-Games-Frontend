
export class WebsocketHandler {
    constructor() {
        this.sendMessage = this.sendMessage.bind(this);
        this.listeners = {};
    }

    setupSocket(lobbyID, playerID) {
        console.log("Setting up websocket")
        this.socket = new WebSocket('wss://sr-games-backend.herokuapp.com/');
        this.socket.onmessage = event => {console.log(event.data)}
        let sendMessage = this.sendMessage;
        this.socket.onopen = () => sendMessage(
            "LobbyJoinRequest",
            {playerID: playerID, lobbyID: lobbyID},
        );
        this.socket.onclose = function(event) {
            if (event.code === 1000) {
                console.log('WebSocket closed normally');
            } else {
                console.log('WebSocket closed unexpectedly: ' + event.code);
            }
        }
        this.socket.onerror = function (event) {
            console.log(event.data);
        };

        this.socket.addEventListener('message', event => {
            let message = JSON.parse(event.data)
            let listener = this.listeners[message.type]

            console.log('Message from server ', message);
            if (listener) {
                this.listeners[message.type](message);
            } else {
                console.log("No listener for message type", message.type)
            }
        });
    }

    sendMessage(type, contents) {
        while (!this.socket.OPEN) {
            console.log("Socket closed REEE")
        }
        this.socket.send(JSON.stringify({
            type: type,
            contents: contents
        }))

    }

    addListener(type, callback) {
        this.listeners[type] = callback;
    }
}
