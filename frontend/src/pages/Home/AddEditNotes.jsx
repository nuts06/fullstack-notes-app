import React, { useState } from 'react'
import {MdClose} from 'react-icons/md'
import TagInput from '../../components/input/TagInput'

const AddEditNotes = ({onClose, noteData, type}) => {
  const[title, setTitle] = useState("")
  const[content, setContent] = useState("")
  const[tags, setTags] = useState(['Natasha', "priyanshi"])
  const[error, setError] = useState("")

  const editNote = async() => {}

  const addNewNote = async() => {}

  const handleAddNote = () =>{
    if(!title){
      setError("Please add a title")
      return
    }

    if(!content){
      setError("Please add some content")
      return
    }
    
    setError("")

    if(type==="edit"){
      editNote()
    } else{
      addNewNote()
    }
  }
  return (
    <div className='relative'>
      {/* Desgin for close button */}
        <button 
          className='w-10 h-10 rounded-full flex items-center cursor-pointer justify-center absolute -top-3 -right-3 hover:bg-slate-50'
          onClick={onClose}
        >
          <MdClose 
            className='text-xl text-slate-400'
          />
        </button>
      {/* Design for title and input field */}
        <div className='flex flex-col gap-2'>
          {/* for title */}
          <label className='input-label text-red-400 uppercase'>TITLE</label>
          <input 
            type="text" 
            className='text-2xl text-slate-950 outline-none mb-5' 
            placeholder='Wake up at 6 am' 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>

        { }
        {/* Design for content */}
        <div className='flex flex-col gap-2'>
          <label className='input-label text-red-400 uppercase'>Content</label>
          <textarea 
          type="text" 
          className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded' 
          placeholder='Content...'
          rows={10}
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          >
            {" "}
          </textarea>
        </div>
        {/* Design for the tags */}
        <div className=''>
          <label className='input-label text-red-400 uppercase'>Tags</label>
          <TagInput 
            tags={tags}
            setTags={setTags}
          />
        </div>

        {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

        {/* design for the add button */}
        <div className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
          + ADD
        </div>
    </div>
  )
}

export default AddEditNotes