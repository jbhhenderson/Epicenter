export const getGameById = (gameId) => {
    var myHeaders = new Headers();
    myHeaders.append("Client-ID", "8q34b6lw9gaiasmlzs1yypuvxo9t9n");
    myHeaders.append("Authorization", "Bearer g9nfc5vhchs92k5rckdbszftk0m0g0");
    myHeaders.append("withCredentials", "true");
    myHeaders.append("Origin", "localhost");
    myHeaders.append("Content-Type", "text/plain");

    var raw = `fields name, cover.url, genres.name, platforms.name, platforms.platform_logo.url, summary; where id = ${gameId};`;

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    return fetch("http://localhost:8080/https://api.igdb.com/v4/games/", requestOptions)
    .then(response => response.json())
}


export const getSimilarGames = (game) => {
    var myHeaders = new Headers();
    myHeaders.append("Client-ID", "8q34b6lw9gaiasmlzs1yypuvxo9t9n");
    myHeaders.append("Authorization", "Bearer g9nfc5vhchs92k5rckdbszftk0m0g0");
    myHeaders.append("withCredentials", "true");
    myHeaders.append("Origin", "localhost");
    myHeaders.append("Content-Type", "text/plain");

    var raw = `fields similar_games.cover.url, similar_games.name; where id = ${game.id};`;

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    return fetch("http://localhost:8080/https://api.igdb.com/v4/games/", requestOptions)
    .then(response => response.json())
}


