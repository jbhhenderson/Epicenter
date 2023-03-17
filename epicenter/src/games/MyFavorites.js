import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { changeLibraryGame } from "../providers/ApiManager"
import { getGameById } from "../providers/GameProviders"
import { getUsersFavoritedGames } from "../providers/ApiManager"

export const MyFavorites = () => {
    const [games, setGames] = useState([])
    const [libraryGames, setLibraryGames] = useState([])
    const [screenHeight, setScreenHeight] = useState("")

    const localEpicenterUser = localStorage.getItem("epicenter_user")
    const epicenterUserObject = JSON.parse(localEpicenterUser)

    useEffect(() => {
        fetchUserFavorites()
    }, [])

    const fetchUserFavorites = () => {
        getUsersFavoritedGames(epicenterUserObject.id)
        .then((userGames) => {
            setLibraryGames(userGames)
            const newArray = []

            userGames.map((userGame) => {
                newArray.push(getGameById(userGame.gameId))
            })

            Promise.all(newArray)
            .then((gameArrays) => {
                if (gameArrays.length) {
                    setGames(gameArrays.reduce((arr, e) => {
                        return arr.concat(e)
                    }))
                }
                if (gameArrays.length >  4) {
                    setScreenHeight("full")
                } else {
                    setScreenHeight("screen")
                }
            })
        })  
    }
    
    const isFavorite = (gameObj) => {
        const foundGame = libraryGames.find((libraryGame) => gameObj.id === libraryGame.gameId)
        return foundGame
    }

    const handleRemoveFavorite = (event, game) => {
        event.preventDefault()

        const foundGame = libraryGames.find((libraryGame) => game.id === libraryGame.gameId && epicenterUserObject.id === libraryGame.userId)
        foundGame.favorite = false
        changeLibraryGame(foundGame)
        .then(() => {
            fetchUserFavorites()
        })
    }

    return <div>
        {
            games.length ?
            
        <div className={`bg-gray-300 pt-24 h-${screenHeight}`}>
            <div className="grid gap-12 grid-cols-4 pl-24">
                {
                    games.map(game => {
                        return <div
                        className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700" key={game.id}>
                        <a href={`http://localhost:3000/gameInfo/${game.id}`}>
                            {
                                game.cover?.url ? <img src={game.cover.url.replace("thumb", "720p")} loading="lazy" className="rounded-t-lg" alt=""/>
                                :<img className="rounded-t-lg" loading="lazy" alt="" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fno-image-available-sign-vector-id1138179183%3Fk%3D6%26m%3D1138179183%26s%3D612x612%26w%3D0%26h%3DprMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE%3D&f=1&nofb=1&ipt=7727c264fde6fb0879a2b7b4ff990b45ce06dc0dd368db646c6be4f8356018b7&ipo=images" />
                            }
                        </a>
                        <div className="p-6">
                        <h5
                            className="mb-2 pb-1 text-xl font-medium leading-tight text-center text-neutral-800 dark:text-neutral-50 border-b-black border-b-2">
                            {game.name}
                        </h5>
                        <div>
                            {
                                isFavorite(game) ? <button className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow shadow-green-500 transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-red-300 focus:bg-primary-600 focus:shadow-green-300 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-green-600"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                onClick={(clickEvent) => handleRemoveFavorite(clickEvent, game)}>Remove from favorites</button>
                                : ""
                            }
                        </div>
                        </div>
                    </div>
                    })
                }
            </div>
        </div>
        : <div className={`bg-gray-300 pt-72px h-screen`}></div>
        }
    </div>
}