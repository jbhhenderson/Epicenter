import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGameById } from "../providers/GameProviders"
import { useNavigate } from "react-router-dom"
import { addGameToCollection } from "../providers/ApiManager"
import { getMessagesByGame } from "../providers/ApiManager"
import { addMessageByGame } from "../providers/ApiManager"
import { removePost } from "../providers/ApiManager"

export const GameInfo = () => {
    const {gameId} = useParams()
    const [game, setGame] = useState([])
    const [gameMessages, setGameMessages] = useState([])
    const [messageText, setMessageText] = useState("")

    const localEpicenterUser = localStorage.getItem("epicenter_user")
    const epicenterUserObject = JSON.parse(localEpicenterUser)

    const navigate = useNavigate()

    useEffect(() => {
        getGameById(gameId)
        .then((data) => { 
            setGame(data[0])
        })
        fetchMessages()
    }, [])

    const fetchMessages = () => {
        getMessagesByGame(gameId)
        .then((messages) => {
            if (messages.length) {
                setGameMessages(messages)
            }
        })
    }

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

    const handleSubmitPost = (event) => {
        event.preventDefault()

        const messageToSendToAPI = {
            userId: epicenterUserObject.id,
            gameId: parseInt(gameId),
            text: messageText,
            timestamp: new Date().toLocaleString()
        }

        addMessageByGame(messageToSendToAPI)
        .then(() => {
            fetchMessages()
        })
    }

    const handleDeletePost = (event, message) => {
        event.preventDefault()

        removePost(message)
        .then(() => {
            fetchMessages()
        })
    }

    return <>
    <h1>Game Info</h1>
    {
        game ? <>
            <div>{game.name}</div>
            {
                game.cover?.url ? <img src={game.cover.url} />
                :<img className="w-28" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fno-image-available-sign-vector-id1138179183%3Fk%3D6%26m%3D1138179183%26s%3D612x612%26w%3D0%26h%3DprMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE%3D&f=1&nofb=1&ipt=7727c264fde6fb0879a2b7b4ff990b45ce06dc0dd368db646c6be4f8356018b7&ipo=images" />
            }
            {
                game.summary ? <div>Summary: {game.summary}</div>
                :""
            }
            {
                game.genres ? <ul>Genre: {game.genres.map((genre) => {
                    return <li key={genre.id}>{genre.name}</li>
                })}</ul>
                :""
            }
            {
                game.platforms ? <ul>Platform: {game.platforms.map((platform) => {
                    return <li key={platform.id}><img src={platform.platform_logo.url}/>{platform.name}</li>
                })}</ul>
                :""
            }
            <button onClick={(clickEvent) => handleAddGameButton(clickEvent)}>Add this game to my Collection</button>
        </>
        :""
    }
    <h1>Chat About This Game</h1>
    <div>
        <input 
            onChange={
                (changeEvent) => {
                    setMessageText(changeEvent.target.value)
                }
            }
        type="text" placeholder="Join the conversation" />
        <button onClick={(clickEvent) => handleSubmitPost(clickEvent)}>Submit Post</button>
    </div>
    {
        gameMessages ? <ul>
            {
                gameMessages.map((message) => {
                    return <li key={message.id}>
                        <p>{message.text}</p>
                        <p>Posted by: {message.user.username}</p>
                        <p>{(message.timestamp)}</p>
                        {
                            epicenterUserObject.id === message.userId ? <button onClick={(clickEvent) => handleDeletePost(clickEvent, message)}>Delete Post</button>
                            : ""
                        }
                    </li>
                })
            }
        </ul>
        : ""
    }
    </>
}