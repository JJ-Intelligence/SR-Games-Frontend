
export function createLobbyRequest(playerID, callback) {
    fetch(
        `https://sr-games-backend.herokuapp.com/createLobby?playerID=${playerID}`)
        .then(response => response.text())
        .then((response) => {
            callback(response)
        })
}

export function createPlayerReDquest(callback) {
    console.log("Starting player request")
    fetch(
        "https://sr-games-backend.herokuapp.com/createPlayer")
        .then(response => response.text().then((response) => {
            console.log("Player request callback triggered")
            callback(response)
        }))
}
