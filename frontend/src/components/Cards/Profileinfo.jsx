import React from 'react'
import { getInitials } from '../../utils/helper'

const Profileinfo = ({onLogout,Buttontext}) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>{getInitials("Natasha Chandrawat ")}</div>
      <div>
        <p className='text-sm font-medium'>Natasha</p>
      </div>
      <button 
        className='text-sm bg-red-500 p-1 rounded-md text-white hover:opacity-80 cursor-pointer'
        onClick={onLogout}
        >{Buttontext}</button>

    </div>
  )
}

export default Profileinfo