import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { getSimilarGames } from "../providers/GameProviders";
import { Link } from "react-router-dom"


export const AddGame = ({games, user}) => {
    const [similarGames, setSimilarGames] = useState([])
    const [randomGame, setRandomGame] = useState([])

    const location = useLocation();
    const currentUser = location.state?.user
    const userGames = location.state?.games

    useEffect(
        () => {
            const randomlySelectedGame = location.state?.games[Math.floor(Math.random()*userGames.length)]
            setRandomGame(randomlySelectedGame)
        }, [])

    useEffect(
        () => {
            if(randomGame) {
                getSimilarGames(randomGame)
                .then((gamesArray) => {
                    setSimilarGames(gamesArray[0].similar_games)
                })
            }
        }, [randomGame])
    // Add search bar
    // Create search API fetch call
    // Display list of searched games
    // add button to suggested games that takes you to individual game pages
    return <>
    Suggested Games
    <ul>
        {
            similarGames?.map(game => {
                return <li key={game.id}>
                    <Link to={`/gameInfo/${game.id}`}><p>{game.name}</p></Link>
                {
                    game.cover?.url ? <img src={game.cover.url} />
                    :<img className="w-28" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fno-image-available-sign-vector-id1138179183%3Fk%3D6%26m%3D1138179183%26s%3D612x612%26w%3D0%26h%3DprMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE%3D&f=1&nofb=1&ipt=7727c264fde6fb0879a2b7b4ff990b45ce06dc0dd368db646c6be4f8356018b7&ipo=images" />
                }
                </li>
            })
        }
    </ul>
    </>
}