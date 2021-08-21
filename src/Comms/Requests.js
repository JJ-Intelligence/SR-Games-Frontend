
export function createLobbyRequest(callback) {
    fetch(
        "https://sr-games-backend.herokuapp.com/createLobby")
        .then(response => response.text())
        .then((response) => {
            callback(response)
        })
}

export function createPlayerRequest(callback) {
    fetch(
        "https://sr-games-backend.herokuapp.com/createPlayer")
        .then(response => response.text())
        .then((response) => {
            callback(response)
        })
}
