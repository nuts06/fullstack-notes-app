import React, {useState} from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete, MdAdd } from "react-icons/md"
import Modal from "react-modal"

const Notecard = ({isPinned, handlePinNote, content, handleEdit, handleDelete, tags, date, title}) => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type:'add',
    data:null
  })
  const modelOpen = () =>{
    alert("button clicked")
  }
  return (
    <>
    <div className='border rounded p-4 bg-white hover:shadow-2xl transition-all ease-in-out cursor-pointer' >
        <div className='flex items-center justify-between'>
            <div >
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-xs text-green-700 '>{date}</span>
            </div>
            <MdOutlinePushPin 
                className={`icon-btn ${isPinned ? "text-[#2B85FF]" : "text-slate-300"}`}
                onClick={handlePinNote}
            />
        </div>
        <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)}</p>

        {/* for tags */}
        <div className='flex items-center justify-between mt-2'>
          <div className='text-xs text-slate-500'>#{tags}</div>
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
    {/* add button */}
    <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2B85FF] hover:bg-blue-600 absolute right-10 bottom-10 cursor-pointer' onClick={()=>{
      setOpenAddEditModal({
        isShown:true,
        type:"add",
        data:null
      })
    }}>
      <MdAdd className='text-[32px] text-white'/>
    </button>
    {/* creating add modal */}
    <Modal isOpen={openAddEditModal.isShown} onRequestClose={()=>{}} 
    style={{
      overlay:{
        backgroundColor:"rgba(0, 0, 0, 0.2)"
      }
    }}
    contentLabel=''
    >

    </Modal>
    </>
  )
}

export default Notecard