import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { changeLibraryGame } from "../providers/ApiManager"
import { getGameById } from "../providers/GameProviders"
import { getUsersGames } from "../providers/ApiManager"
import { removeGameFromUserLibrary } from "../providers/ApiManager"

export const MyGames = () => {
    const [games, setGames] = useState([])
    const [libraryGames, setLibraryGames] = useState([])
    const [screenHeight, setScreenHeight] = useState("")
    const [recentlyAdded, setRecentlyAdded] = useState({})
    
    const localEpicenterUser = localStorage.getItem("epicenter_user")
    const epicenterUserObject = JSON.parse(localEpicenterUser)


    useEffect(() => {
        fetchUserGames()      
    }, [])

    const fetchUserGames = () => {
        getUsersGames(epicenterUserObject.id)
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
                    setRecentlyAdded(gameArrays[gameArrays.length - 1])
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
        if (foundGame) {
            return foundGame.favorite
        }
    }

    const handleRemoveFavorite = (event, game) => {
        event.preventDefault()

        const foundGame = libraryGames.find((libraryGame) => game.id === libraryGame.gameId && epicenterUserObject.id === libraryGame.userId)
        foundGame.favorite = false
        changeLibraryGame(foundGame)
        .then(() => {
            fetchUserGames()
        })
    }

    const handleAddFavorite = (event, game) => {
        event.preventDefault()

        const foundGame = libraryGames.find((libraryGame) => game.id === libraryGame.gameId && epicenterUserObject.id === libraryGame.userId)
        foundGame.favorite = true
        changeLibraryGame(foundGame)
        .then(() => {
            fetchUserGames()
        })

    }

    const handleRemoveGameFromList = (event, game) => {
        event.preventDefault()

        const foundGame = libraryGames.find((libraryGame) => game.id === libraryGame.gameId && epicenterUserObject.id === libraryGame.userId)
        removeGameFromUserLibrary(foundGame)
        .then(() => {
            fetchUserGames()
        })

    }

    

    return <div>
    {
        games.length ? <div className={`bg-gray-300 pt-72px h-full`}>
    <div className="mx-auto px-60 py-12">

        <div className="flex dark:bg-neutral-700 border border-gray-300 rounded-xl overflow-hidden justify-start">
            <div className="relative w-60 h-60 flex-shrink-0">
                <div className="left-0 top-0 w-full h-full flex items-center justify-center">
                <a href={`http://localhost:3000/gameInfo/${recentlyAdded[0].id}`}>
                    <img alt="Placeholder Photo" className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={`${recentlyAdded[0].cover.url.replace("thumb", "720p")}`}/>
                </a>
                </div>
            </div>
            <div className="p-4">
                <p className="text-4xl text-white border-b border-black w-full">Recently Added: {recentlyAdded[0].name}</p>
                <p className="text-md text-white mt-1 line-clamp-2">{recentlyAdded[0].summary}</p>                       
            </div>                       
        </div>
    </div>
    <div className="grid gap-12 grid-cols-4 pl-24 pb-5">
    <div className="block flex flex-col max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-400">
        

        <Link to={'/addGame'} state={{
        games: games,
        user: epicenterUserObject
        }}>
        
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="pt-12 mx-auto ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
        </Link>
        <div className="bottom-0 w-full p-6 h-[167px] mt-auto dark:bg-neutral-700 rounded-b-lg">
            <h5
                className="mb-2 pb-1 text-xl font-medium leading-tight text-center text-neutral-800 dark:text-neutral-50 border-b-black border-b-2">
                Add a Game
            </h5>
            <Link to={'/addGame'} state={{
                    games: games,
                    user: epicenterUserObject
                }}>
                    <button className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow shadow-green-500 transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-green-300 focus:bg-primary-600 focus:shadow-green-300 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-green-600">
                        Choose your next adventure
                    </button>
                </Link>
        </div>
    </div>
    {
        games.map(game => {
            return <div
            className="block relative max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700" key={game.id}>
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
                        isFavorite(game) ? <button className="inline-block rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow shadow-green-500 transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-red-300 focus:bg-primary-600 focus:shadow-green-300 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-green-600"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={(clickEvent) => handleRemoveFavorite(clickEvent, game)}>Remove from favorites</button>
                        : <button className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow shadow-green-500 transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-green-300 focus:bg-primary-600 focus:shadow-green-300 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-green-600"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={(clickEvent) => handleAddFavorite(clickEvent, game)}>Add to favorites</button>
                    }
                
                <button type="button"
                    className="inline-block rounded bg-primary mt-2 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow shadow-green-500 transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-red-300 focus:bg-primary-600 focus:shadow-green-300 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-green-600"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={(clickEvent) => handleRemoveGameFromList(clickEvent, game)}>Remove Game From My Collection</button>
                </div>
                </div>
            </div>

        })
    }
    </div>
    </div>
:<div className={`bg-gray-300 pt-72px h-screen`}>

<div className="mx-auto px-60 py-12">

<div className="flex dark:bg-neutral-700 border border-gray-300 rounded-xl overflow-hidden justify-start">
    
    <div className="p-4">
        <p className="text-4xl text-white border-b border-black w-full">Recently Added: None?</p>
        <p className="text-md text-white mt-1 line-clamp-2"> You haven't added any games!
        Click below to start building your collection!</p>                       
    </div>                       
</div>
</div>
    <div className="block mx-10 flex flex-col max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-400">
        

        <Link to={'/addGame'} state={{
            games: games,
            user: epicenterUserObject
        }}>
        
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="pt-12 mx-auto ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
           
        </Link>
        <div className="bottom-0 w-full p-6 h-[167px] mt-auto dark:bg-neutral-700 rounded-b-lg">
            <h5
                className="mb-2 pb-1 text-xl font-medium leading-tight text-center text-neutral-800 dark:text-neutral-50 border-b-black border-b-2">
                Add a Game
            </h5>
            <Link to={'/addGame'} state={{
                games: games,
                user: epicenterUserObject
                }}>
                    <button className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow shadow-green-500 transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-green-300 focus:bg-primary-600 focus:shadow-green-300 focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-green-600">
                        Choose your next adventure
                    </button>
                </Link>
        </div>
    </div>
</div>
}
    </div>
}
