import React, { useState } from 'react'
import Password from '../../components/input/Password'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState(" ")
  const navigate = useNavigate()
  
  // handle signup
  const handleSignup = async(e)=>{
    e.preventDefault()

    if(!validateEmail(email.trim())){
      setEmailError("Please enter a valid email address")
      return
    }

    if(!name.trim()){
      setNameError("Please enter a name")
      return
    }

    if(!password.trim()){
      setPasswordError("Please enter the password")
      return
    }
    axios.post("http://localhost:3000/api/auth/signup", {
      name,
      email,
      password
  })
  .then(response => {
      console.log("Signup response:", response);
      if (response.status === 201) {
        toast.success("Signup successful, Redirecting to login", {
          position: "top-right",
          autoClose: 3000, 
        });
        setName("");
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/login"), 3000);
      }
  })
  .catch(err => {
      console.log("Signup error:", err);
  
      if (err.response && err.response.status === 400) {
          alert(err.response.data.message);
      } else {
          alert("Something went wrong");
      }
  });
    setEmailError("")
    setNameError("")
    setPasswordError("")
  }
  return (
    <div className='flex justify-center mt-28'>
      <div className='w-90 rounded bg-white px-7 py-10'>
        <form onSubmit={handleSignup}>
          <h4 className='text-2xl mb-7 text-center'>Sign Up</h4>
          <input 
            type="text"
            placeholder='Enter your Name'
            className='input-box'
            value={name}
            onChange={(e)=>{
              // setName(e.target.value)
              const value = e.target.value
              setName(value)
              setNameError(value.trim() ? "" : "Please enter name")
            }}
            />
            {nameError&&<p className='text-sm text-red-500 mb-2 -mt-4'>{nameError}</p>}

            <input 
            type="text"
            placeholder='Enter your Email'
            className='input-box'
            value={email}
            onChange={(e)=>{
              const value = e.target.value
              setEmail(value)
              setEmailError(value ? "" : "Please enter email")
            }}
            />
            {emailError&&<p className='text-sm text-red-500 mb-2 -mt-4'>{emailError}</p>}

            <Password 
              password={password}
              setPassword={setPassword}
              onChange={(e)=>{
                const value = e.target.value
                setPassword(value)
                setPasswordError(value ? "" : "Please enter password")
              }}
            />
            {passwordError&&<p className='text-sm text-red-500 mb-1'>{passwordError}</p>}

            <button 
              onClick={handleSignup} 
              disabled={!name || !email || !password} 
              className={`btn-primary mt-4 h-10 
              ${(!name || !email || !password) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
              Signup
            </button>
            <p className='text-center text-sm mt-4'>Already have an account?{" "}<Link to="/login" className='underline text-blue-500 font-medium'>Login Here</Link></p>
        </form>
      </div>
        {/* Toast Container */}
        <ToastContainer />
    </div>
  )
}

export default Signup