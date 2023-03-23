import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGameById } from "../providers/GameProviders"
import { useNavigate } from "react-router-dom"
import { addGameToCollection } from "../providers/ApiManager"
import { getMessagesByGame } from "../providers/ApiManager"
import { addMessageByGame } from "../providers/ApiManager"
import { removePost } from "../providers/ApiManager"
import { getUsersGames } from "../providers/ApiManager"
import { removeGameFromUserLibrary } from "../providers/ApiManager"
import { GameWebsites } from "./GameWebsites"
import { ReviewBars } from "./ReviewsBars"
import { getReviewsByGameId } from "../providers/ApiManager"
import { removeReview } from "../providers/ApiManager"
import { addReviewByGame } from "../providers/ApiManager"
import { StarAmount } from "./StarAmount"


export const GameInfo = () => {
    const {gameId} = useParams()
    const [game, setGame] = useState([])
    const [libraryGames, setLibraryGames] = useState([])
    const [releaseDate, setReleaseDate] = useState("")
    const [gameMessages, setGameMessages] = useState([])
    const [messageText, setMessageText] = useState("")
    const [reviews, setReviews] = useState([])
    const [reviewText, setReviewText] = useState("")
    const [reviewScore, setReviewScore] = useState("")
    const [starColorFive, setStarColorFive] = useState("text-neutral-500")
    const [starColorFour, setStarColorFour] = useState("text-neutral-500")
    const [starColorThree, setStarColorThree] = useState("text-neutral-500")
    const [starColorTwo, setStarColorTwo] = useState("text-neutral-500")
    const [starColorOne, setStarColorOne] = useState("text-neutral-500")


    const localEpicenterUser = localStorage.getItem("epicenter_user")
    const epicenterUserObject = JSON.parse(localEpicenterUser)

    const navigate = useNavigate()

    useEffect(() => {
        loadGamePage()
    }, [])

    const loadGamePage = () => {
        getGameById(gameId)
        .then((data) => { 
            setGame(data[0])
            const gameDate = new Date(data[0].first_release_date*1000).toLocaleDateString()
            setReleaseDate(gameDate)
        })
        fetchMessages()
        getUsersGames(epicenterUserObject.id)
        .then((userGames) => {
            setLibraryGames(userGames)
        })
        fetchReviews()
    }

    const fetchMessages = () => {
        getMessagesByGame(gameId)
        .then((messages) => {
            if (messages.length) {
                setGameMessages(messages)
            }
        })
    }

    const fetchReviews = () => {
        getReviewsByGameId(gameId)
        .then((foundReviews) => {
            if (foundReviews.length) {
                setReviews(foundReviews)
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

    const handleRemoveGameFromList = (event) => {
        event.preventDefault()

        const foundGame = libraryGames.find((libraryGame) => game.id === libraryGame.gameId && epicenterUserObject.id === libraryGame.userId)
        removeGameFromUserLibrary(foundGame)
        .then(() => {
            loadGamePage()
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

    const handleSubmitReview = (event) => {
        event.preventDefault()

        const reviewToSendToAPI = {
            userId: epicenterUserObject.id,
            gameId: parseInt(gameId),
            text: reviewText,
            score: parseInt(reviewScore),
            timestamp: new Date().toLocaleString()
        }

        addReviewByGame(reviewToSendToAPI)
        .then(() => {
            fetchReviews()
        })
    }

    const handleDeleteReview = (event, review) => {
        event.preventDefault()

        removeReview(review)
        .then(() => {
            fetchReviews()
        })
    }

    const handleSetStarValue = (event, score) => {
        event.preventDefault()
        const greenStar = "text-green-500"
        const grayStar = "text-neutral-500"

        if (score === 5) {
            setStarColorFive(greenStar)
            setStarColorFour(greenStar)
            setStarColorThree(greenStar)
            setStarColorTwo(greenStar)
            setStarColorOne(greenStar)
        } else if (score === 4) {
            setStarColorFive(grayStar)
            setStarColorFour(greenStar)
            setStarColorThree(greenStar)
            setStarColorTwo(greenStar)
            setStarColorOne(greenStar)
        } else if (score === 3) {
            setStarColorFive(grayStar)
            setStarColorFour(grayStar)
            setStarColorThree(greenStar)
            setStarColorTwo(greenStar)
            setStarColorOne(greenStar)
        } else if (score === 2) {
            setStarColorFive(grayStar)
            setStarColorFour(grayStar)
            setStarColorThree(grayStar)
            setStarColorTwo(greenStar)
            setStarColorOne(greenStar)
        } else if (score === 1) {
            setStarColorFive(grayStar)
            setStarColorFour(grayStar)
            setStarColorThree(grayStar)
            setStarColorTwo(grayStar)
            setStarColorOne(greenStar)
        }

        setReviewScore(score)
    }

    const isGameAdded = () => {
        const foundGame = libraryGames.find((libraryGame) => libraryGame.gameId === parseInt(gameId) && epicenterUserObject.id === libraryGame.userId)

        if(foundGame) {
            return <button className="mt-32 ml-20 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow shadow-red-500 transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-red-300 focus:bg-primary-600 focus:shadow-red-300 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-green-600" 
            onClick={(clickEvent) => handleRemoveGameFromList(clickEvent)}>Remove this game from my Collection</button>
        } else {
            return <button className="mt-32 ml-20 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow shadow-green-500 transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-green-300 focus:bg-primary-600 focus:shadow-green-300 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-green-600" 
            onClick={(clickEvent) => handleAddGameButton(clickEvent)}>Add this game to my Collection</button>
        }
    }

    return <>
    <div className="bg-gray-300 pt-72px flex">
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
                <div className="grid grid-cols-2 p-4 rounded-lg mx-20 dark:bg-neutral-500">
                <div>Release Date: {releaseDate}</div>
                <div className="grid grid-cols-2">
                {
                    game.genres ? <ul className="">Genres: {game.genres.map((genre) => {
                        return <li key={genre.id}>{genre.name}</li>
                    })}</ul>
                    :""
                }
                {
                    game.themes ? <ul> Themes: {game.themes.map((theme) => {
                        return <li key={theme.id}>{theme.name}</li>
                    })}

                    </ul>
                    :""
                }
                </div>
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
                {
                    game.websites ? <ul className="pt-4 grid grid-cols-2"> Game Links:
                        {
                            game.websites.map(website => {
                               return GameWebsites(website)
                            })
                        }
                    </ul>
                    : ""
                }
                </div>
                <div className="flex justify-end">
                    <div>
                    {isGameAdded()}

                    </div>
                    {ReviewBars(gameId)}
                </div>

            </div>
        </>
        :""
    }
    </div>
    <div className="flex bg-gray-300 pt-72px pl-10 pb-28 h-full">
        <div className="w-1/3 bg-neutral-500 p-4 rounded-lg">
            <h1 className="text-4xl text-white mb-10">Chat About This Game</h1>
            {
                gameMessages ? <ul>
                    {
                        gameMessages.map((message) => {
                            return <li key={message.id} className="relative dark:bg-neutral-700 text-white rounded-lg mb-6">
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
                    <textarea className="block p-4 h-24 w-full text-gray-900 border border-gray-300 rounded-t-lg bg-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={
                            (changeEvent) => {
                                setMessageText(changeEvent.target.value)
                            }
                        }
                    type="text" placeholder="Join the conversation" />
                <div className="dark:bg-neutral-700 rounded-b h-10 relative">
                    <button className=" absolute bottom-1 left p-1 ml-4 bg-green-500 rounded" onClick={(clickEvent) => handleSubmitPost(clickEvent)}>Submit Post</button>
                </div>
            </div>
        </div>
        <div className="w-1/3 ml-64 bg-neutral-500 p-4 rounded-lg">
            <h1 className="text-4xl mb-10">Reviews</h1>
            {
                reviews ? <ul>
                    {
                        reviews.map((review) => {
                            return <li key={review.id} className="relative dark:bg-neutral-700 text-white w-full rounded-lg mb-6">
                                        <div className="p-2">Review by: {review.user.username} {StarAmount(review)}</div>
                                        <p className="dark:bg-neutral-600 px-2">{review.text}</p>
                                        <p className="dark:bg-neutral-600 px-2 rounded-b">{(review.timestamp)}</p>
                                        {
                                            epicenterUserObject.id === review.userId ? <button className="absolute top-1 right-1 p-1 bg-red-600 rounded" onClick={(clickEvent) => handleDeleteReview(clickEvent, review)}>Delete Review</button>
                                            : ""
                                        }
                                    </li>
                        })
                    }
                </ul>
                : ""
            }
            <div className="mt-6 w-full">
                <textarea className="block p-4 h-24 w-full text-gray-900 border border-gray-300 rounded-t-lg bg-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={
                        (changeEvent) => {
                            setReviewText(changeEvent.target.value)
                        }
                    }
                type="text" placeholder="What are your thoughts on this game?" />
                <div className="dark:bg-neutral-700 rounded-b h-10 relative">
                    <div className="flex flex-row-reverse">
                        <i className="flex flex-row-reverse bg-neutral-800 rounded-lg px-1 w-20 mx-2 mt-2">        
                            <svg aria-hidden="true" className={`w-5 h-5 ${starColorFive} peer peer-hover:text-green-500 hover:text-green-500 focus:text-green-500`} onClick={(clickEvent) => handleSetStarValue(clickEvent, 5)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Perfect</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg aria-hidden="true" className={`w-5 h-5 ${starColorFour} peer peer-hover:text-green-500 hover:text-green-500 focus:text-green-500`} onClick={(clickEvent) => handleSetStarValue(clickEvent, 4)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Great</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg aria-hidden="true" className={`w-5 h-5 ${starColorThree} peer peer-hover:text-green-500 hover:text-green-500 focus:text-green-500`} onClick={(clickEvent) => handleSetStarValue(clickEvent, 3)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Average</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg aria-hidden="true" className={`w-5 h-5 ${starColorTwo} peer peer-hover:text-green-500 hover:text-green-500 focus:text-green-500`} onClick={(clickEvent) => handleSetStarValue(clickEvent, 2)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Not For Me</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg aria-hidden="true" className={`w-5 h-5 ${starColorOne} peer peer-hover:text-green-500 hover:text-green-500 focus:text-green-500`} onClick={(clickEvent) => handleSetStarValue(clickEvent, 1)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Unplayable</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        </i>
                    </div> 
                    <button className=" absolute bottom-1 left- p-1 ml-4 bg-green-500 rounded" onClick={(clickEvent) => handleSubmitReview(clickEvent)}>Submit Review</button>
                </div>
            </div>
        </div>
    </div>
    </>
}