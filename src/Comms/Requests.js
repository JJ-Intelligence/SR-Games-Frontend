
export function createLobby(callback) {
    fetch(
        "https://sr-games-backend.herokuapp.com/createLobby")
        .then(response => response.text())
        .then((response) => {
            callback(response)
        })
}
