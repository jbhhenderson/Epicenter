export const getUserEmailAndPassword = (email, password) => {
    return fetch(`http://localhost:8088/users?email=${email}&password=${password}`)
        .then(res => res.json())
}

export const postNewUser = (user) => {
    return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
}

export const getUserEmailAndUsername = (user) => {
    return fetch(`http://localhost:8088/users?email=${user.email}&username=${user.username}`)
            .then(res => res.json())
}

export const addGameToCollection = (libraryGame) => {
    return fetch("http://localhost:8088/libraryGames", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(libraryGame)
    })
}

export const changeLibraryGame = (game) => {
    return fetch(`http://localhost:8088/libraryGames/${game.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    })
    .then(response => response.json())
}

export const getFavoritedGames = () => {
    return fetch("http://localhost:8088/libraryGames?favorite=true")
    .then(res => res.json()) 
}

export const getUsersGames = (userId) => {
    return fetch (`http://localhost:8088/libraryGames?userId=${userId}`)
    .then(res => res.json()) 
}

export const getUsersFavoritedGames = (userId) => {
    return fetch(`http://localhost:8088/libraryGames?userId=${userId}&favorite=true`)
    .then(res => res.json()) 
}

export const getMessagesByGame = (gameId) => {
    return fetch(`http://localhost:8088/messages?gameId=${gameId}&_expand=user`)
    .then(res => res.json()) 
}

export const addMessageByGame = (messageObj) => {
    return fetch("http://localhost:8088/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageObj)
    })
}

export const removePost = (messageObj) => {
    return fetch(`http://localhost:8088/messages/${messageObj.id}`, {
        method: "DELETE"
    })
}

export const removeGameFromUserLibrary = (libraryGame) => {
    return fetch(`http://localhost:8088/libraryGames/${libraryGame.id}`, {
        method: "DELETE"
    })
}

export const getReviewsByGameId = (gameId) => {
    return fetch(`http://localhost:8088/reviews?gameId=${gameId}&_expand=user`)
    .then(res => res.json()) 
}

export const addReviewByGame = (reviewObj) => {
    return fetch("http://localhost:8088/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewObj)
    })
}

export const removeReview = (reviewObj) => {
    return fetch(`http://localhost:8088/reviews/${reviewObj.id}`, {
        method: "DELETE"
    })
}