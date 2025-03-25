import React, { useState } from 'react'
import Password from '../../components/input/Password'
import {Link} from "react-router-dom"
import { validateEmail } from '../../utils/helper'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

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

    setPasswordError("")
    setEmailError("")
    // LoginAPI
  }
  return (
    <div className='flex items-center justify-center mt-28 '>
      <div className='w-90 rounded bg-white px-7 py-10'>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7 text-center'>Login</h4>  
          <input 
            type="text" 
            placeholder='Enter your email' 
            className='input-box' 
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
              setEmailError("")
            }}
          />
          {emailError && <p className='text-red-500 text-sm -mt-3 pb-3'>{emailError}</p>}
          <Password 
            password={password}
            setPassword={setPassword}
            onChange={(e)=>{
              setPassword(e.target.value)
              setPasswordError("")
            }}
          />
          {passwordError && <p className='text-red-500 text-sm pb-1'>{passwordError}</p>}

          <button type='submit' disabled={!email || !password} className={`btn-primary mt-4 h-10 ${(!email || !password) ? 'opacity-50 cursor-not-allowed' : ''}`}>Login</button>
          <p className='text-sm text-center mt-4'>Not Registered Yet? {" "}<Link to={"/signup"} className='font-medium underline text-[#2B85FF]'>Create an account</Link></p>
        </form>
      </div>
    </div>
    
  )
}

export default Login