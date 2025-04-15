import React from 'react'
import { getInitials } from '../../utils/helper'
import { useNavigate } from 'react-router-dom'

const Profileinfo = ({onLogout,Buttontext,name}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/profile-view');
  };
  return (
    <div className='flex items-center gap-3'>
      {name && <><div onClick={handleClick} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>{getInitials(name)}</div>
      <div>
        <p className='text-sm font-medium'>{name}</p>
      </div></>}
      <button 
        className='text-sm bg-red-500 p-1 rounded-md text-white hover:opacity-80 cursor-pointer'
        onClick={onLogout}
        >{Buttontext}</button>
    </div>
  )
}

export default Profileinfo