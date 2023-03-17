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
    <div className="bg-gray-300 pt-72px h-full flex">
    {
        game ? <>
            {
                game.cover?.url ? <img className="border border-black rounded ml-10 mt-4" src={game.cover.url.replace("thumb", "720p")} />
                :<img className="w-28" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fno-image-available-sign-vector-id1138179183%3Fk%3D6%26m%3D1138179183%26s%3D612x612%26w%3D0%26h%3DprMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE%3D&f=1&nofb=1&ipt=7727c264fde6fb0879a2b7b4ff990b45ce06dc0dd368db646c6be4f8356018b7&ipo=images" />
            }
            <div className="relative mt-4 ml-8 dark:bg-neutral-700 text-white rounded-lg font-bold mr-4">
                <div className="text-7xl underline decoration-black decoration-2 underline-offset-8 text-center">{game.name}</div>
                    {
                        game.summary ? <div className="mx-20 my-6">Summary: {game.summary}</div>
                        :""
                    }
                <div className="grid grid-cols-2 ml-20">
                {
                    game.genres ? <ul className="">Genres: {game.genres.map((genre) => {
                        return <li key={genre.id}>{genre.name}</li>
                    })}</ul>
                    :""
                }
                {
                    game.platforms ? <ul>Platforms: {game.platforms.map((platform) => {
                        return <li key={platform.id}>
                            <div>
                                {platform.name}
                            </div>
                            </li>
                    })}</ul>
                    :""
                }
                </div>
                <button className="absolute bottom-20 ml-20 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow shadow-green-500 transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-green-300 focus:bg-primary-600 focus:shadow-green-300 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-green-600" 
                onClick={(clickEvent) => handleAddGameButton(clickEvent)}>Add this game to my Collection</button>
            </div>
        </>
        :""
    }
    </div>
    <div className="bg-gray-300 pt-72px pl-10 pb-28 h-full">
    <h1 className="text-4xl mb-10">Chat About This Game</h1>
    {
        gameMessages ? <ul>
            {
                gameMessages.map((message) => {
                    return <li key={message.id} className="relative dark:bg-neutral-700 text-white rounded-lg w-1/3 mb-6">
                        <p className="p-2">Posted by: {message.user.username}</p>
                        <p className="dark:bg-neutral-600 px-2">{message.text}</p>
                        <p className="dark:bg-neutral-600 px-2 rounded-b">{(message.timestamp)}</p>
                        {
                            epicenterUserObject.id === message.userId ? <button className="absolute top-1 right-1 p-1 bg-red-600 rounded" onClick={(clickEvent) => handleDeletePost(clickEvent, message)}>Delete Post</button>
                            : ""
                        }
                    </li>
                })
            }
        </ul>
        : <div className={`bg-gray-300 h-screen`}>"</div>
    }
        <div className="mt-6">
        <textarea className="block w-1/3 p-4 h-24 text-gray-900 border border-gray-300 rounded-t-lg bg-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={
                (changeEvent) => {
                    setMessageText(changeEvent.target.value)
                }
            }
        type="text" placeholder="Join the conversation" />
        <div className="dark:bg-neutral-700 w-1/3 rounded-b h-10 relative">
            <button className=" absolute bottom-1 left p-1 ml-4 bg-green-500 rounded" onClick={(clickEvent) => handleSubmitPost(clickEvent)}>Submit Post</button>
        </div>
    </div>

    </div>
    </>
}