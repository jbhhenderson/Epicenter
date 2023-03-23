import { Link } from "react-router-dom"

export const GameWebsites = (website) => {
    let websiteType = ""
    if(website.category === 1) {
        websiteType = "Official Website"
    } else if (website.category === 2) {
        websiteType = "Wikia"
    } else if (website.category === 3) {
        websiteType = "Wikipedia"
    } else if (website.category === 4) {
        websiteType = "Facebook"
    } else if (website.category === 5) {
        websiteType = "Twitter"
    } else if (website.category === 6) {
        websiteType = "Twitch"
    } else if (website.category === 8) {
        websiteType = "Instagram"
    } else if (website.category === 9) {
        websiteType = "YouTube"
    } else if (website.category === 10) {
        websiteType = "iPhone AppStore"
    } else if (website.category === 11) {
        websiteType = "iPad AppStore"
    } else if (website.category === 12) {
        websiteType = "Android Store"
    } else if (website.category === 13) {
        websiteType = "Steam"
    } else if (website.category === 14) {
        websiteType = "Reddit"
    } else if (website.category === 15) {
        websiteType = "Itch"
    } else if (website.category === 16) {
        websiteType = "EpicGames"
    } else if (website.category === 17) {
        websiteType = "GOG"
    } else if (website.category === 18) {
        websiteType = "Discord"
    }
    return <li key={website.category} className="transition ease-out duration-500 dark:hover:text-green-500">
        <Link to={website.url}>{websiteType}</Link>
    </li>
}