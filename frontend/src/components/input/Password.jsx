import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"


const Password = ({password, setPassword, onChange}) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const eyeChange = () =>{
        setIsShowPassword((prev) => !prev);
    }
   
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded'>
        <input 
            type={isShowPassword ? "text" : "password"} 
            placeholder='Enter your password' 
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={password}
            onChange={onChange}
          />
          {isShowPassword ? <FaRegEye size={22} className='text-[#2B85FF] cursor-pointer' onClick={eyeChange}/>: (
            <FaRegEyeSlash size={22} className='text-slate-400 cursor-pointer' onClick={eyeChange}/>
          )}
    </div>
  )
}

export default Password