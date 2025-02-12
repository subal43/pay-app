import { TokenInfo } from "./TokenInfo";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

export const Appbar=()=>{
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [logOut , setLogOut] = useState(false);
        useEffect(() => {
            async function fetchData() {
                const userInfo = await TokenInfo();
                setCurrentUser(userInfo); 
                setIsLoading(false); 
            }
            fetchData();
        }, []);
        if (isLoading) {
        
            return <div>Loading user information...</div>;
        }
    
    return <div className="h-13 shadow flex justify-between ">
        <div className="text-sm place-content-center ml-6">
            Pay-App
        </div>
        <div className="flex justify-end w-50 items-center mr-6">
            <div className="text-sm mr-2">
                <span className="font-bold text-base">Hello</span><span className="font-medium"> {currentUser.firstName} {currentUser.lastName} </span>
            </div>
            <div className="h-7 w-7  text-center rounded-full  bg-slate-200" onClick={()=>{setLogOut(!logOut)}}>
                    {currentUser.firstName[0]}
                    {logOut &&(
                    <ul className="cursor-pointer absolute  right-3 top-9  text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mt-6">
                        <li onClick={()=>{
                            navigate("/signin")
                            localStorage.removeItem("token")
                        }}>LogOut</li>
                    </ul>
                    )}  
            </div>
            
        </div>

    </div>
}