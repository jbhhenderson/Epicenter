import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import { getGames } from "../providers/GameProviders"

export const MyGames = () => {
    const [games, setGames] = useState([])
    
    // useEffect(() => {
    //     getGames().then(
    //         (data) => {
    //             setGames(data)
    //         }
    //     )
    // }, [])

    useEffect(() => {
        getGames()
    }, [])
    
    const getGames = () => {
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
    
        fetch("https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/", requestOptions)
        .then(response => response.json())
        .then(result => {setGames(result)
        console.log(result)})
        .catch(error => console.log('error', error));
    }
    

    return <>
    <h1>My Games</h1>
    <ul>
        {
            games.map(game => {
                return <li>
                    <div>
                        <Link to={`/gameInfo/${game.id}`}><p>{game.name}</p></Link>
                    </div>
                    {
                        game.cover?.url ? <img src={game.cover.url} />
                        :""
                    }
                                        
                </li>
            })
        }
    </ul>
    </>
}