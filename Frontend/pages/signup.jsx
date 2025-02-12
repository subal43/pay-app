import { Heading } from "../components/heading"
import { SubHeading } from "../components/subheading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtomWarning"
import { useState } from "react"
import axios from 'axios';
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom"

export function Signup(){
    const [username,setUsername] = useState("");
    const [password,setPassword ] = useState("");
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName ] = useState("");
    const navigate = useNavigate();
    return <div className="bg-sky-200 h-screen flex justify-center items-center">
         <div className="bg-white rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-4">
         <div className="flex flex-col">
        <Heading label={"Sign up"}/>
        <SubHeading label={"Enter your information to create an account"}/>
        <InputBox label={"First Name"} placeholder={"firstname"} onChange={e=>{setFirstName(e.target.value);}} />
        <InputBox label={"Last Name"} placeholder={"lastname"} onChange={e=>{setLastName(e.target.value);}}/>
        <InputBox label={"Email"} placeholder={"email"} onChange={e=>{setUsername(e.target.value);}}/>
        <InputBox label={"Password"} placeholder={"password"} onChange={e=>{setPassword(e.target.value);}}/>
      
        <Button label={"Sign Up"} onclick={async (event)=>{
            event.preventDefault();
            try{
           const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                password,
                firstName,
                lastName
            })
            if(response.status===200){
                Swal.fire("Signup successfull");
                navigate("/dashboard")

            }
            
            localStorage.setItem("token",response.data.token)
        }
        catch(e){
            console.log(e)
            Swal.fire("Signup failed. Please try again");

        }
        }}/>
        <ButtonWarning label={"Already have an account? "} buttonText={"Sign in"} to={"/signin"}/>
        </div>
        </div>
    </div>
   
}