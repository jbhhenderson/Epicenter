import { Outlet, Route, Routes } from "react-router-dom"
import { AddGame } from "../games/AddGame"
import { GameInfo } from "../games/GameInfo"
import { Homepage } from "../games/Homepage"
import { MyFavorites } from "../games/MyFavorites"
import { MyGames } from "../games/MyGames"
import { TopGames } from "../games/TopGames"
import { HomepageNews } from "../news/HomepageNews"

export const ApplicationViews = () => {
    return <>
        <Routes>
        <Route path="/" element={
            <>
            <Homepage />
            <Outlet />













            </>}/>
            <Route path="/addGame" element={
                <AddGame />}/>
            <Route path="/news" element={
                <HomepageNews />}/>
            <Route path="/gameInfo/:gameId" element={
                <GameInfo />}/>
            <Route path="/myGames" element={
                <MyGames />}/>
            <Route path="/myFavorites" element={
                <MyFavorites />}/>
            <Route path="/topGames" element={
                <TopGames /> 
            } />
        </Routes>
    </>
}