import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getUserEmailAndUsername } from "../providers/ApiManager"
import { postNewUser } from "../providers/ApiManager"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
    })
    let navigate = useNavigate()

    useEffect(() => {
        animation()
    }, []

    )

    const registerNewUser = () => {
        postNewUser(user)
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("epicenter_user", JSON.stringify({
                        id: createdUser.id,
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        getUserEmailAndUsername(user)
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address or username already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

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
        {/* <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Epicenter</h1>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input onChange={updateUser}
                           type="text" id="username" className="form-control"
                           placeholder="Enter your username" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateUser}
                        type="password" id="password" className="form-control"
                        placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main> */}

    <div className = "body bg-white dark:bg-[#0F172A]">
        <div className = "bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 overflow-hidden before:via-[#00FF00] before:to-gray-900 before:absolute ">
            <div id="myDIV" >
                <div className = "w-[100vw] h-[100vh] px-3 sm:px-5 flex items-center justify-center absolute">
                    <div className = "w-full sm:w-1/2 lg:2/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4  rounded-lg">
                        <div className = "w-full flex justify-center text-[#00FF00] text-xl mb:2 md:mb-5">
                            Please Register for Epicenter
                        </div>
                        <div className="mb-6">
                            <label htmlFor="username" className="block mb-2 text-xs font-medium text-white">Your username</label>
                            <input type="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required
                            
                            onChange={updateUser}/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-xs font-medium text-white">Your email</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com" required
                            
                            onChange={updateUser}/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-xs font-medium text-white">Your password</label>
                            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                            onChange={updateUser}/>
                        </div>
                        
                        <button onClick={(clickEvent) =>handleRegister(clickEvent)} className = "mt-4 md:mt-10 w-full flex text-neutral-700 justify-center text-sm md:text-xl bg-[#00FF00] py-2 rounded-md">
                            Register Profile
                        </button>
            
                    </div>
                </div>
            </div>
        </div>
    </div>

    {animation()}    
    </>)
}

