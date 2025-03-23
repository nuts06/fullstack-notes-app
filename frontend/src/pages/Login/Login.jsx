import React, { useState } from 'react'
import Password from '../../components/input/Password'
import {Link} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  return (
    <div className='flex items-center justify-center mt-28 '>
      <div className='w-90 rounded bg-white px-7 py-10'>
        <form action="">
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
          />

          <button type='submit' className='btn-primary mt-4 h-10 '>Login</button>
          <p className='text-sm text-center mt-4'>Not Registered Yet? <Link to={"/signup"} className='underline text-blue-600'>Create an account</Link></p>
        </form>
      </div>
    </div>
    
  )
}

export default Login