import { Link } from "react-router-dom"


export const NavBar = () => {
    return (
        <ul>
          <li><Link to="/myGames">My Games</Link></li>
          <li><Link to="/myFavorites">My Favorites</Link></li>
          <li><Link to="/topGames">Top Games</Link></li>
          <li><Link to="/addGame">Add Game</Link></li>
        </ul>
    )
}