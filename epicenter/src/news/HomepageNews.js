import { useEffect, useState } from "react"
import { getNews } from "../providers/NewsProviders"
import { Link } from "react-router-dom"

export const HomepageNews = () => {
    const [newsArticles , setNewsArticles] = useState([])

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = () => {
        getNews()
        .then((news) => {
            setNewsArticles(news.articles)
        })
    }

    return <div className={` flex-col bg-gray-300 pt-72px h-full`}>
        <div className="text-4xl w-2/3 rounded-lg ml-80 pb-3 shadow-md shadow-neutral-700 mt-6 text-white text-center dark:bg-neutral-700 ">Stay Up To Date With What's Happening In The Gaming Sphere</div>
        {
            newsArticles.map(article => {
                if (article.description && article.content && article.urlToImage) {
                return <div className="mx-auto px-60 py-6" key={article.title}>

                <div className="flex dark:bg-neutral-700 shadow-md shadow-neutral-700 rounded-xl overflow-hidden justify-start">
                    <div className="relative w-40 h-40 flex-shrink-0">
                        <div className="left-0 top-0 w-full h-full flex items-center justify-center">
                        <a href={article.url}>
                            <img alt="Placeholder Photo" className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={article.urlToImage}/>
                        </a>
                        </div>
                    </div>
                    <div className="p-4">
                        <Link to={article.url}>
                            <p className="text-2xl text-white border-b border-black w-full">{article.description}</p>
                        </Link>
                        <p className="text-md dark:bg-neutral-400 rounded-lg px-2 text-neutral-700 mt-3 line-clamp-2">{article.content.split("[")[0]}</p>                       
                    </div>                       
                </div>
            </div>

                }
            })
        }
        
        </div>
}