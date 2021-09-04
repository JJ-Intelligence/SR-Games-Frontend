
export class WebsocketHandler {
    constructor() {
        this.listeners = {};
    }

    // Sets-up a new Websocket connection to the backend
    setupSocket(lobbyID, playerID) {
        // Create a new WebSocket and connect to the backend
        console.log("Setting up new websocket")
        this.socket = new WebSocket('wss://sr-games-backend.herokuapp.com/');
        console.log("Websocket setup")

        // Once the websocket opens, send a LobbyJoinRequest
        this.socket.onopen = () => this.sendMessage(
            "LobbyJoinRequest",
            {playerID: playerID, lobbyID: lobbyID},
        );

        // Debugging
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

        // When we receive a message, pass it to a registered listener
        this.socket.addEventListener('message', event => {
            let message = JSON.parse(event.data)
            let listener = this.listeners[message.type]

            console.log('Message from server ', message);
            if (listener) {
                listener(message.contents);
            } else {
                console.log("No listener for message type", message.type)
            }
        });
    }

    // Sends a message to the backend
    sendMessage(type, contents) {
        this.socket.send(JSON.stringify({
            type: type,
            contents: contents
        }))

    }

    // Adds a new message listener
    addListener(type, callback) {
        this.listeners[type] = callback;
    }

    // Closes the websocket
    close() {
        this.socket.close()
    }
}
