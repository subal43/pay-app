import { Heading } from "../components/heading";
import { SendMoneyName } from "../components/SendMoneyName";
import { InputBox } from "../components/InputBox";
import { TransferButton } from "../components/TransferButtom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export function SendMoney() {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id");
    const firstname = searchParams.get("firstname");
    const lastname = searchParams.get("lastname");
    const [amount, setAmount] = useState(" "); 
    const navigate = useNavigate();

    return <div className="bg-sky-100 h-screen flex justify-center items-center">
        <div className="bg-white rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-4">
            <div className="flex flex-col">
                <div className="flex justify-end cursor-pointer" onClick={()=>{navigate("/dashboard")}}><FaTimes /></div>
                <Heading label={"Send Money"} />
                <SendMoneyName firstname={firstname} lastname={lastname}/>
                <InputBox label={"Amount (in Rs)"} placeholder={"Enter amount"} value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
                <TransferButton label={"  Initiate Transfer"} onclick={async()=>{
                    
                    try{
                  const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to:id,
                        amount: parseFloat(amount),
                    },{
                        headers:{
                            authorization : "Bearer " + localStorage.getItem("token")
                        }
                    })
                    if(response.status===200){
                   
                        toast.success("Transaction successful!");
                        setAmount("")
                    }
                }catch(err){
                    console.log(err)
                    toast.error("Transaction failed. Please try again.");
                }
                  
                }}/>
                
                
            </div>
        </div>
    </div>
}