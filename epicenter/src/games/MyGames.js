import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { changeLibraryGame } from "../providers/ApiManager"
import { getGameById } from "../providers/GameProviders"
import { getUsersGames } from "../providers/ApiManager"

export const MyGames = () => {
    const [games, setGames] = useState([])
    const [libraryGames, setLibraryGames] = useState([])
    
    const localEpicenterUser = localStorage.getItem("epicenter_user")
    const epicenterUserObject = JSON.parse(localEpicenterUser)
    const navigate = useNavigate()


    useEffect(() => {
        getUsersGames(epicenterUserObject.id)
        .then((userGames) => {
            setLibraryGames(userGames)
            const newArray = []

            userGames.map((userGame) => {
                newArray.push(getGameById(userGame.gameId))
            })

            Promise.all(newArray)
            .then((gameArrays) => {
                setGames(gameArrays.reduce((arr, e) => {
                    return arr.concat(e)
                }))
            })
        })        
    }, [])

    
    const isFavorite = (gameObj) => {
        const foundGame = libraryGames.find((libraryGame) => gameObj.id === libraryGame.gameId)
        return foundGame.favorite
    }

    const handleRemoveFavorite = (event, game) => {
        event.preventDefault()

        const foundGame = libraryGames.find((libraryGame) => game.id === libraryGame.gameId && epicenterUserObject.id === libraryGame.userId)
        foundGame.favorite = false
        changeLibraryGame(foundGame)
        navigate("/myGames")
    }

    const handleAddFavorite = (event, game) => {
        event.preventDefault()

        const foundGame = libraryGames.find((libraryGame) => game.id === libraryGame.gameId && epicenterUserObject.id === libraryGame.userId)
        foundGame.favorite = true
        changeLibraryGame(foundGame)
        navigate("/myGames")

    }

    return <>
    <h1>My Games</h1>
    <Link to={'/addGame'} state={{
            games: games,
            user: epicenterUserObject
        }}>Add a Game</Link>
    <ul>
        {
            games.map(game => {
                return <li key={game.id}>
                    <div>
                        <Link to={`/gameInfo/${game.id}`}><p>{game.name}</p></Link>
                    </div>
                    {
                        game.cover?.url ? <img src={game.cover.url} />
                        :<img className="w-28" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fno-image-available-sign-vector-id1138179183%3Fk%3D6%26m%3D1138179183%26s%3D612x612%26w%3D0%26h%3DprMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE%3D&f=1&nofb=1&ipt=7727c264fde6fb0879a2b7b4ff990b45ce06dc0dd368db646c6be4f8356018b7&ipo=images" />
                    }
                    {
                        isFavorite(game) ? <button onClick={(clickEvent) => handleRemoveFavorite(clickEvent, game)}>Remove from favorites</button>
                        : <button onClick={(clickEvent) => handleAddFavorite(clickEvent, game)}>Add to favorites</button>
                    }                 
                </li>
            })
        }
    </ul>
    </>
}