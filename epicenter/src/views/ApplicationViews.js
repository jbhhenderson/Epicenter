import { Outlet, Route, Routes } from "react-router-dom"
import { AddGame } from "../games/AddGame"
import { GameInfo } from "../games/GameInfo"
import { MyGames } from "../games/MyGames"
import { TopGames } from "../games/TopGames"

export const ApplicationViews = () => {
    return <>
        <Routes>
        <Route path="/" element={
            <>
            <main className="image w-100 h-screen bg-no-repeat margin-auto bg-cover">
            <div className=""> 
                </div>
           </main>
            <Outlet />













            </>}/>
            <Route path="/addGame" element={
                <AddGame />}/>
            <Route path="/gameInfo/:gameId" element={
                <GameInfo />}/>
            <Route path="/myGames" element={
                <MyGames />}/>
            <Route path="/topGames" element={
                <TopGames /> 
            } />
        </Routes>
    </>
}