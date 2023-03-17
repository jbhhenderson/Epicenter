import { Link, useNavigate, useLocation } from "react-router-dom"


export const NavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

    return (
        
<nav className="bg-white  sm:px-4 py-2.5 dark:bg-black fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
  <div className="flex flex-wrap items-center justify-between w-full">
  <a href="http://localhost:3000" className="flex items-center">
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Fi%2Fd973d6bf-18bc-4eae-be2c-a9525f132b2b%2Fdbgjypc-8332252b-2b8a-47a0-aa02-945356e1d74c.png&f=1&nofb=1&ipt=24610f8950e30159a6d13d9b7308f5c2e7868421a423b1cf861082dfd677c37b&ipo=images" className="rounded h-6 mr-3 sm:h-9" alt="Flowbite Logo"/>
      <span className="self-center text-xl  font-semibold whitespace-nowrap dark:text-white">Epicenter</span>
  </a>
  <div className="flex md:order-2">
      <button type="button" className="text-white bg-blue-700 transition dark:hover:text-red-500 ease-out duration-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-0 dark:bg-neutral-700 dark:hover:bg-neutral-800 dark:focus:ring-blue-800" onClick={() => {
        localStorage.removeItem("epicenter_user")
        navigate("")
        }}>Log Out</button>
      
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-500 md:dark:bg-neutral-700 dark:border-gray-700">
      <li>
        <p href="#" className={`block py-2 pl-3 pr-4 text-gray-600 transition ease-out duration-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-green-500  dark:hover:bg-neutral-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/myGames" ? "text-green-500" : "dark:text-white"}`} aria-current="page"><Link to="/myGames">My Games</Link></p>
      </li>
      <li>
        <p href="#" className={`block py-2 pl-3 pr-4 text-gray-600 transition ease-out duration-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-green-500  dark:hover:bg-neutral-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/myFavorites" ? "text-green-500" : "dark:text-white"}`}><Link to="/myFavorites">My Favorites</Link></p>
      </li>
      <li>
        <p href="#" className={`block py-2 pl-3 pr-4 text-gray-600 transition ease-out duration-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-green-500  dark:hover:bg-neutral-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/topGames" ? "text-green-500" : "dark:text-white"}`}><Link to="/topGames">Top Games</Link></p>
      </li>
      
    </ul>
  </div>
  </div>
</nav>

    )
}

