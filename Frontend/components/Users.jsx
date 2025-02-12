import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from 'axios';
import { useDebounce } from "../Hooks/Debouncing";
import { useNavigate } from "react-router-dom"
import { TokenInfo } from "./TokenInfo";


export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const debouncedValue = useDebounce(filter, 500)
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + debouncedValue)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [debouncedValue])

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

    return <div className="ml-6 mr-6 ">
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div>
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} className="w-full h-7 border border-slate-200 rounded" placeholder=" Search users ..."></input>
        </div>
        <div>
            {users.map((user) => {
                if (currentUser._id === user._id) {
                    return null; 
                }
                return <UserList key={user._id} user={user} />;
            })}
        </div>

    </div>
}

function UserList({ user }) {
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-3 mr-2 ">
                <div className="flex flex-col justify-center h-full text-xl ">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center  h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button
                onclick={(e) => {
                    navigate("/sendmoney?id=" + user._id + "&firstname=" + user.firstName + "&lastname=" + user.lastName)
                }}
                label={"Send Money"} />
        </div>
    </div>

}
