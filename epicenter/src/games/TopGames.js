import { useEffect, useState } from "react"
import { getGameById } from "../providers/GameProviders"
import { getFavoritedGames } from "../providers/ApiManager"
import { Link } from "react-router-dom"

export const TopGames = () => {

    const [games, setGames] = useState([])
    const [topTenGames, setTopTenGames] = useState([]) 
    const [screenHeight, setScreenHeight] = useState("")
   
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
            if (gameArray.length >  3) {
                setScreenHeight("full")
            } else {
                setScreenHeight("screen")
            }
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

    return <div>
        {
            topTenGames.length ?

    <div className={`pt-20 bg-gray-300 h-full`}>
    <div className="text-4xl pl-72 pt-6">Top {topTenGames.length} Games Favorited by Users:</div>
   <ul>
    {
        topTenGames.map((game) => {return<li key={game.id}>
            <div className="mx-auto px-60 py-12">
                <div className="flex dark:bg-neutral-700 border border-gray-300 rounded-xl overflow-hidden justify-start">
                    <div className="relative w-60 h-60 flex-shrink-0">
                        <div className="left-0 top-0 w-full h-full flex items-center justify-center">
                        <Link to={`/gameInfo/${game.id}`}>
                            {
                                game.cover?.url ? <img alt="Placeholder Photo" loading="lazy" className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" src={`${game.cover.url.replace("thumb", "720p")}`}/>
                                : <img alt="Placeholder Photo" loading="lazy" className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fno-image-available-sign-vector-id1138179183%3Fk%3D6%26m%3D1138179183%26s%3D612x612%26w%3D0%26h%3DprMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE%3D&f=1&nofb=1&ipt=7727c264fde6fb0879a2b7b4ff990b45ce06dc0dd368db646c6be4f8356018b7&ipo=images" />
                            }
                        </Link>
                        </div>
                    </div>
                    <div className="relative p-4">
                        <p className="text-4xl text-white border-b border-black w-full">
                        {
                            game.name ? game.name
                            : ""
                        }
                        </p>
                        <p className="text-md text-white mt-1 line-clamp-2">
                        {
                            game.summary ? game.summary
                            : ""
                        }
                        </p>
                        
                        <p className="absolute bottom-2 text-sm text-white mt-1 line-clamp-2">Favorites: {game.favoriteAmount}</p>                       
                    </div>                       
                </div>
            </div>
            
            </li>
        })
    }
    </ul>
    </div>
        : <div className={`bg-gray-300 pt-72px h-screen`}></div>
    }
    </div>
}