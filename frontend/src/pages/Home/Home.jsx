import React, { useState } from 'react'
import Notecard from '../../components/Cards/Notecard'
import Modal from "react-modal"
import AddEditNotes from '../../pages/Home/AddEditNotes'
import { MdAdd } from 'react-icons/md'

const Home = () => {
  const [content, setContent] = useState("Hello there my name is natasha and i am very happy to share that and i am working hard towards my dreams and it gives me confidence when i solve bugs without anyone helo")
  const[tags, setTags] = useState("meow")
  const[title, setTitle] = useState("")
  const[date, setDate] = useState("")
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type:'add',
    data:null
  })
  const modelOpen = () =>{
    alert("button clicked")
  }
  const handlePinNote = () =>{
    alert("Pinned")
  } 

  // on edit
  const handleEdit = () =>{
    alert("Created")
  }

  // on delete
  const handleDelete = () =>{
    alert("Deleted")
  }
  const isPinned = true;
  return (
    <>
    <div className='container mx-auto'>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 max-md:m-5'>
      <Notecard 
        handlePinNote={handlePinNote}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        content={content}
        tags={tags}
        title={title}
        date={date}
        isPinned={isPinned}
      />
      <Notecard />
      <Notecard />
      <Notecard />
      <Notecard />
      <Notecard />
      <Notecard />
      <Notecard />
      <Notecard />
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
    className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll custom-scrollbar"
    >
      <AddEditNotes 
        onClose={()=>setOpenAddEditModal({isShown:false, type:"add", data:null})}
        noteData={openAddEditModal.data}
        type={openAddEditModal.type}
      />
    </Modal>
    </>
  )
}

export default Home