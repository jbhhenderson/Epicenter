export const getUserEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
        .then(res => res.json())
}

export const postNewUser = (customer) => {
    return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
}

export const getCustomerEmail = (customer) => {
    return fetch(`http://localhost:8088/users?email=${customer.email}`)
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
