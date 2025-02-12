import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import { Signup } from '../pages/signup'
import { Signin } from '../pages/signin'
import { Dashboard } from '../pages/Dashboard'
import { SendMoney } from '../pages/SendMoney'
import {Check} from "../pages/check"
import { ToastContainer } from "react-toastify";
function App() {
   return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/sendmoney" element={<SendMoney/>}/>
        <Route path="/" element={<Check/>}/>
        
      </Routes>
      </BrowserRouter>
      {/* <Signup></Signup> */}
      {/* <Signin></Signin> */}
    </>
  )
}

export default App
