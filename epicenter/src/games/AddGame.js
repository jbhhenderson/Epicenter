import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { getSimilarGames } from "../providers/GameProviders";
import { Link } from "react-router-dom"
import { getSearchedGames } from "../providers/GameProviders";


export const AddGame = ({games, user}) => {
    const [similarGames, setSimilarGames] = useState([])
    const [randomGame, setRandomGame] = useState([])
    const [seachTerms, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const location = useLocation();
    const currentUser = location.state?.user
    const userGames = location.state?.games

    useEffect(
        () => {
            if(location.state?.games.length) {
                const randomlySelectedGame = location.state?.games[Math.floor(Math.random()*userGames.length)]
                setRandomGame(randomlySelectedGame)
            }
    }, [])

    useEffect(
        () => {
            if(randomGame.id) {
                getSimilarGames(randomGame)
                .then((gamesArray) => {
                    setSimilarGames(gamesArray[0].similar_games)
                })
            }
    }, [randomGame])
    
    useEffect(
        () => {
            if(seachTerms) {
                getSearchedGames(seachTerms)
                .then((searchedGames) => {
                    setSearchResults(searchedGames)
                })
            }

    }, [seachTerms])

    // Display list of searched games
    return <div className={`bg-gray-300 h-full`}>
    <div className="pt-24">
        <input className="ml-6 mb-6 bg-neutral-700 rounded-lg p-2 text-white"
            onChange={
                (changeEvent) => {
                    setSearch(changeEvent.target.value)
                }
            }
        type="text" placeholder="Search for a game" />
    </div>
    {
        searchResults.length ? <>
            Search Results 
            <div className="grid gap-12 grid-cols-5 pb-5">
            {
                searchResults.map((game) => {
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
                        
                        </div>
                    </div>
                //     return <li key={game.id}>
                //     <Link to={`/gameInfo/${game.id}`}><p>{game.name}</p></Link>
                // {
                //     game.cover?.url ? <img src={game.cover.url} />
                //     :<img className="w-28" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fno-image-available-sign-vector-id1138179183%3Fk%3D6%26m%3D1138179183%26s%3D612x612%26w%3D0%26h%3DprMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE%3D&f=1&nofb=1&ipt=7727c264fde6fb0879a2b7b4ff990b45ce06dc0dd368db646c6be4f8356018b7&ipo=images" />
                // }
                // </li>
                })
            }
            </div>
            </>
        : <div>
            <h5 className="text-4xl pl-6 pb-6">Games You Might Like:</h5>
        <div className="grid gap-12 grid-cols-5 px-6 pb-5">
        {
            similarGames?.map(game => {
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
                    
                    </div>
                </div>
            })
        }
    </div>
    </div>
    }
    
    </div>
}