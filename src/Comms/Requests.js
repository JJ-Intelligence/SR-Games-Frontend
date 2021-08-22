
export function createLobbyRequest(playerID, callback) {
    fetch(
        `https://sr-games-backend.herokuapp.com/createLobby?playerID=${playerID}`)
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
