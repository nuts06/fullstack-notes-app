import React, { useState } from 'react'
import Password from '../../components/input/Password'
import {Link} from "react-router-dom"
import { validateEmail } from '../../utils/helper'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async(e) =>{
    e.preventDefault()

    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return
    }
    if(!password){
      setError("Please enter the password")
      return
    }

    setError("")
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
            onChange={(e)=>setEmail(e.target.value)}
          />
          <Password 
            password={password}
            setPassword={setPassword}
            onChange={(e)=>setPassword(e.target.value)}
          />
          {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}

          <button type='submit' className='btn-primary mt-4 h-10 '>Login</button>
          <p className='text-sm text-center mt-4'>Not Registered Yet? {" "}<Link to={"/signup"} className='font-medium underline text-[#2B85FF]'>Create an account</Link></p>
        </form>
      </div>
    </div>
    
  )
}

export default Login