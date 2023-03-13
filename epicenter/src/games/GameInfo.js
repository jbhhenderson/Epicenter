import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGameById } from "../providers/GameProviders"
import { useNavigate } from "react-router-dom"
import { addGameToCollection } from "../providers/ApiManager"

export const GameInfo = () => {
    const {gameId} = useParams()
    const [game, setGame] = useState([])

    const localEpicenterUser = localStorage.getItem("epicenter_user")
    const epicenterUserObject = JSON.parse(localEpicenterUser)

    const navigate = useNavigate()

    useEffect(() => {
        getGameById(gameId)
        .then((data) =>{ setGame(data[0])
        console.log(data)})
    }, [])

    const handleAddGameButton = (event) => {
        event.preventDefault()

        const gameToSendToAPI = {
            userId: epicenterUserObject.id,
            gameId: parseInt(gameId),
            favorite: false
        }

        addGameToCollection(gameToSendToAPI)
        .then(() => {
            navigate("/myGames")
        })
    }

    return <>
    <h1>Game Info</h1>
    <div>{game.name}</div>
    {
        game.summary ? <div>Summary: {game.summary}</div>
        :""
    }
    {
        game.genres ? <ul>Genre: {game.genres.map((genre) => {
            return <li>{genre.name}</li>
        })}</ul>
        :""
    }
    {
        game.platforms ? <ul>Platform: {game.platforms.map((platform) => {
            return <li><img src={platform.platform_logo.url}/>{platform.name}</li>
        })}</ul>
        :""
    }
    <button onClick={(clickEvent) => handleAddGameButton(clickEvent)}>Add this game to my Collection</button>
    </>
}