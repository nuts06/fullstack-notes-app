import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md"

const Notecard = ({isPinned, handlePinNote, content, handleEdit, handleDelete}) => {
  return (
    <div>
        <div className='flex items-center justify-between'>
            <div >
                <h6 className='text-sm font-medium'>Wake Up at 6 AM</h6>
                <span className='text-sm text-green-700 '>26th March, 2025</span>
            </div>
            <MdOutlinePushPin 
                className={`icon-btn ${isPinned ? "text-[#2B85FF]" : "text-slate-300"}`}
                onClick={handlePinNote}
            />
        </div>
        <p className='text-xs text-slate-600 mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus ex odit earum alias harum, nisi, iste eius dignissimos blanditiis qui in? Dolorem in id earum sequi veritatis doloribus sunt totam.
        Velit commodi veniam quisquam itaque assumenda quam fuga sed vitae corrupti ad? Fugiat, esse error commodi iste laboriosam rerum, asperiores quo unde voluptatum, quae adipisci similique incidunt aliquid tempora vitae!
        Recusandae </p>

        {/* for tags */}
        <div className='flex items-center justify-between mt-2'>
          <div className='text-xs text-slate-500'>#tags</div>
          <div className='flex items-center gap-2'>
            <MdCreate 
              className='icon-btn hover:text-green-600'
              onClick={handleEdit}
            />
            <MdDelete 
              className="icon-btn hover:text-red-600"
              onClick={handleDelete}
            />
          </div>
        </div>

    </div>
  )
}

export default Notecard