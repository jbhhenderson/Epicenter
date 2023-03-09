export const getGames = () => {
    var myHeaders = new Headers();
    myHeaders.append("Client-ID", "8q34b6lw9gaiasmlzs1yypuvxo9t9n");
    myHeaders.append("Authorization", "Bearer g9nfc5vhchs92k5rckdbszftk0m0g0");
    myHeaders.append("Content-Type", "text/plain");
    myHeaders.append("withCredentials", true);
    myHeaders.append("Origin", "localhost");

    var raw = "fields name, involved_companies, cover, genres.name, platforms.name, summary; ";

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    return fetch("https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/", requestOptions)
    .then(response => response.json())
}

export const getGameById = (gameId) => {
    var myHeaders = new Headers();
    myHeaders.append("Client-ID", "8q34b6lw9gaiasmlzs1yypuvxo9t9n");
    myHeaders.append("Authorization", "Bearer g9nfc5vhchs92k5rckdbszftk0m0g0");
    myHeaders.append("withCredentials", "true");
    myHeaders.append("Origin", "localhost");
    myHeaders.append("Content-Type", "text/plain");

    var raw = `fields name, cover.url, genres.name, platforms.name, summary; where id = ${gameId};`;

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    return fetch("https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/", requestOptions)
    .then(response => response.json())
}

export const getFavoritedGames = () => {
    return fetch("http://localhost:8088/libraryGames?favorite=true")
    .then(res => res.json()) 
}