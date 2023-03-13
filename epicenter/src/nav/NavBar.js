import { Link, useNavigate } from "react-router-dom"


export const NavBar = () => {
  const navigate = useNavigate()

    return (
        <ul>
          <li><Link to="/myGames">My Games</Link></li>
          <li><Link to="/myFavorites">My Favorites</Link></li>
          <li><Link to="/topGames">Top Games</Link></li>
          <li><Link to="" onClick={() => {
            localStorage.removeItem("epicenter_user")
          }}>Logout</Link></li>
        </ul>
    )
}