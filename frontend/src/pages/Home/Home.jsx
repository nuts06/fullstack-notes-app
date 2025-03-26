import React, { useState } from 'react'
import Notecard from '../../components/Cards/Notecard'

const Home = () => {
  const [content, setContent] = useState("")
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
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5'>
      <Notecard 
        handlePinNote={handlePinNote}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
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
  )
}

export default Home