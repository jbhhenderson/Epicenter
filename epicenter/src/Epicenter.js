import { NavBar } from "./nav/NavBar"
import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"


export const Epicenter = () => {
    return <>
        <Routes>
            <Route path="*" element={
                <>
                    <NavBar />
                    <ApplicationViews />
                </>
            }/>
        </Routes>
    </>
}