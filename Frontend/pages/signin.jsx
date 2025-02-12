import { Heading } from "../components/heading"
import { SubHeading } from "../components/subheading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtomWarning"
import { useState } from "react"
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2";



export function Signin() {
    const [username,setUsername] = useState("");
    const [password,setPassword ] = useState("");
    const navigate = useNavigate();

    return <div className="bg-sky-200 h-screen flex justify-center items-center">
        <div className="bg-white rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-4">
            <div className="flex flex-col">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account"}/>
                <InputBox label={"Email"} placeholder={"email"} onChange={e=>{setUsername(e.target.value);}}/>
                <InputBox label={"Password"} placeholder={"password"} onChange={e=>{setPassword(e.target.value);}}/>
                <Button label={"Sign In"} onclick={async()=>{
                    try{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username,
                            password,
                        })
                       
                        if(response.status===200){
                            Swal.fire("SignIn successfull");
                             navigate("/dashboard")

                        }
                        
                        localStorage.setItem("token",response.data.token)

                    }
                    catch(e){
                        console.log(e)
                        Swal.fire("SignIn failed. Please try again");

                    }
                }

                }/>
                <ButtonWarning label={"Don't have an account? "} buttonText={"Sign up"} to={"/signup"}/>
               

            </div>
        </div>
    </div>
}