import React, { useState } from 'react'
import Password from '../../components/input/Password'
import {Link, useNavigate} from "react-router-dom"
import { validateEmail } from '../../utils/helper'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import RegisterBackground from "../../assets/images/venusregister.jpg"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const navigate = useNavigate()


  // api calling for the handle login
  const handleLogin = async(e) =>{
    e.preventDefault()

    if(!validateEmail(email)){
      setEmailError("Please enter a valid email address")
      return
    }
    if(!password){
      setPasswordError("Please enter the password")
      return
    }
    axios.post("http://localhost:3000/api/auth/login", {
      email,
      password
    })
    .then(response =>{
      console.log("login response", response);
      if(response.data.success){
        localStorage.setItem("token", response.data.token)

        toast.success("Login Successful", {
          position: 'top-right',
          autoClose:3000
        })
        setEmail("")
        setPassword("")
        setTimeout(()=> navigate("/"), 3000)
      }
      // console.log("response natasha", response.data.user.name)
      localStorage.setItem("userName", response.data.user.name);
      window.dispatchEvent(new Event("userLoggedIn"));
    })
    .catch(err =>{
      console.log("Login error", err);
      if(err.response && err.response.status === 400){
        // alert(err.response.data.message)
      toast.error(err.response.data.message,{
        position: 'top-right',
        autoClose:2000
      })}
      else if(err.response && err.response.status === 401)
      {
        toast.error("Invalid credentials", {
          position: 'top-right',
          autoClose: 3000
        });
      }
      else {
        toast.error("Something went wrong", {
          position: 'top-right',
          autoClose: 3000
        });
      }
    })
    setEmail("")
    setPassword("")

    setPasswordError("")
    setEmailError("")
    // LoginAPI
  }


  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img 
        className="fixed top-0 left-0 w-full h-full object-cover -z-10" 
        src={RegisterBackground} 
        alt="Background" 
      />
      {/* Form Container */}
      <div className="flex justify-center items-center h-full px-4">
      <form onSubmit={handleLogin} className="ml-4 sm:ml-10 md:ml-[5px] flex flex-col">
      <h2 className="text-4xl font-semibold mb-6 text-center text-white mr-[35px]">Login</h2>
      {/* <input 
        type="text" 
        placeholder='Enter your email' 
        className="w-72 md:w-80 p-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"  
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
          setEmailError("")
        }}
      /> */}
      <label className="block mb-2 text-white">Email</label>
              <input 
                type="text"
                value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                  setEmailError("")
                }}
                className="w-[350px] text-white p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your email"
                required 
              />
      {emailError && <p className='text-red-500 text-sm -mt-3 pb-3'>{emailError}</p>}
  
      <label className="block mb-2 text-white">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e)=>{
                  setPassword(e.target.value)
                  setPasswordError("")
                }}
                className="w-[350px] text-white p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your email"
                required 
              />
              

        {passwordError && <p className='text-red-500 text-sm pb-1'>{passwordError}</p>}

        <button type='submit' disabled={!email || !password} className={`bg-orange-700 transition-all text-white mt-4 w-[350px] h-[48px]   ${(!email || !password) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>Login</button>

        <p className='text-sm text-center mt-4 text-white'>Not Registered Yet? {" "}<Link to={"/register"} className='font-medium underline text-[#2B85FF]'>Create an account</Link></p>
      </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login