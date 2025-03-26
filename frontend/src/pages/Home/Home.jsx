import React, { useState } from 'react'
import Notecard from '../../components/Cards/Notecard'

const Home = () => {
  const [content, setContent] = useState("Hello there my name is natasha and i am very happy to share that and i am working hard towards my dreams and it gives me confidence when i solve bugs without anyone helo")
  const[tags, setTags] = useState("meow")
  const[title, setTitle] = useState("")
  const[date, setDate] = useState("")
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
  )
}

export default Home