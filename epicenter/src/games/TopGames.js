import { useEffect, useState } from "react"
import { getFavoritedGames } from "../providers/GameProviders"


export const TopGames = () => {

    const [games, setGames] = useState([])
    const [topTenGames, setTopTenGames] = useState([])    
    useEffect(() => {
        getFavoritedGames()
        .then((gameArray) => {
            const reducedGames = gameArray.reduce((acc, game) => {
                const foundGame = acc.find((object) => game.gameId === object.gameId)
                if (foundGame) {
                    foundGame.favoriteAmount ++
                } else {
                    game.favoriteAmount = 1
                    acc.push(game)
                }
                return acc
            }, [])
            setGames(reducedGames)
        })
    }, [])

    useEffect(() => {
        let shortGameArray = []
        games.sort((a,b) => {return b - a})
        games.slice([0], [10]).map((game, i) => {
            shortGameArray.push(game)
        })
        console.log(shortGameArray)
        shortGameArray.map((game) => {
            
        })
        setTopTenGames(shortGameArray)
    }, [games])

    return <>
    Top Games
    <ul>
    {
        topTenGames.map((game) => {
            <li>{game.name} {game.favoriteAmount} Favorites</li>
            
        })
    }
    </ul>
    </>
}