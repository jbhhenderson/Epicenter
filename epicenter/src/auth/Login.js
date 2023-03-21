import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { getUserEmailAndPassword } from "../providers/ApiManager";

export const Login = () => {
    const [email, set] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

            getUserEmailAndPassword(email, password)
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("epicenter_user", JSON.stringify({
                        id: user.id,
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    useEffect(() => {
        animation()
    }, []

    )

    const animation = () => {
        const para = document.createElement("div");
        
        para.className = 'flex flex-wrap gap-0.5 h-screen items-center justify-center  relative';
            let el = '<div class = "  transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-neutral-900 hover:bg-[#00FF00]"></div>'
            for (var k = 1; k<=1000; k++){
                el+= '<div class = " transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-neutral-900 hover:bg-[#00FF00]"></div>';
            };
    
            para.innerHTML = el;
        if (document.getElementById("myDIV")) {
            
            document.getElementById("myDIV").appendChild(para);
        }
    }
    
    return (<>
        
    <div className = "body bg-white dark:bg-[#0F172A]">
        <div className = "bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 overflow-hidden before:via-[#00FF00] before:to-gray-900 before:absolute ">
            <div id="myDIV" >
                <div className = "w-[100vw] h-[100vh] px-3 sm:px-5 flex items-center justify-center absolute">
                    <div className = "w-full sm:w-1/2 lg:2/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4  rounded-lg">
                        <div className = "w-full flex justify-center text-[#00FF00] text-xl mb:2 md:mb-5">
                            Sign In
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-xs font-medium text-white">Your email</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com" required
                            value={email}
                            onChange={evt => set(evt.target.value)}/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-xs font-medium text-white">Your password</label>
                            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}/>
                        </div>
                        <div className = "flex flex-row justify-between">
                            <div className = "text-[#00FF00] text-sm md:text-md"><Link to="/register">Not a member yet?</Link></div>
                        </div>
                        <button onClick={(clickEvent) =>handleLogin(clickEvent)} className = "mt-4 md:mt-10 w-full flex text-neutral-700 justify-center text-sm md:text-xl bg-[#00FF00] py-2 rounded-md">
                            Login
                        </button>
            
                    </div>
                </div>
            </div>
        </div>
    </div>

    {animation()}
    </>
    )
}