import React from 'react'
import { MdOutlinePushPin } from "react-icons/md"

const Notecard = () => {
  return (
    <div>
        <div className='flex items-center justify-between'>
            <div >
                <h6 className='text-sm font-medium'>Wake Up at 6 AM</h6>
                <span className='text-sm text-green-700 '>26th March, 2025</span>
            </div>
            <MdOutlinePushPin 
                className={`icon-btn ${isPinned ? "text-[#2B85FF]" : "text-slate-300"}`}
            />
        </div>
    </div>
  )
}

export default Notecard