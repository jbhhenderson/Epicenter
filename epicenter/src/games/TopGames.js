import { useEffect, useState } from "react"
import { getGameById } from "../providers/GameProviders"
import { getFavoritedGames } from "../providers/ApiManager"
import { Link } from "react-router-dom"

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
        let shortenedGameArray = []

        games.sort((a,b) => {return b - a})

        games.slice([0], [10]).map((game, i) => {
            shortenedGameArray.push(game)
        })
        const newArray = []

        shortenedGameArray.map((game) => {
            newArray.push(getGameById(game.gameId))

        })
            Promise.all(newArray)
            .then((gameArrays) => {
                const copy = []
                gameArrays.map((gameArray) => {
                    const foundGame = shortenedGameArray.find((game) =>gameArray[0].id === game.gameId)
                    gameArray[0].favoriteAmount = foundGame.favoriteAmount
                    copy.push(gameArray[0])
                })
                setTopTenGames(copy)
            })

    }, [games])

    return <>
    Top {topTenGames.length} Games Favorited by Users
   
    {
        topTenGames.map((game) => {return<>
            <li key={game.id}>
            <Link to={`/gameInfo/${game.id}`}><p>{game.name}</p></Link> Favorites: {game.favoriteAmount}
                {
                    game.cover?.url ? <img src={game.cover.url} />
                    :<img className="w-28" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fno-image-available-sign-vector-id1138179183%3Fk%3D6%26m%3D1138179183%26s%3D612x612%26w%3D0%26h%3DprMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE%3D&f=1&nofb=1&ipt=7727c264fde6fb0879a2b7b4ff990b45ce06dc0dd368db646c6be4f8356018b7&ipo=images" />
                }
                {
                    game.summary ? game.summary
                    : ""
                }
            </li>
            </>
        })
    }
    
    </>
}