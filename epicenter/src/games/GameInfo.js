import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGameById } from "../providers/GameProviders"

export const GameInfo = () => {
    const {gameId} = useParams()
    const [game, setGame] = useState([])

    useEffect(() => {
        getGameById(gameId)
        .then((data) =>{ setGame(data[0])
        console.log(data)})
    }, [])

    return <>
    <h1>Game Info</h1>
    <div>{game.name}</div>
    {
        game.summary ? <div>Summary: {game.summary}</div>
        :""
    }
    {
        game.genres ? <div>Genre: {game.genres[0].name}</div>
        :""
    }
    {
        game.platforms ? <div>Platform: {game.platforms[0].name}</div>
        :""
    }

    </>
}