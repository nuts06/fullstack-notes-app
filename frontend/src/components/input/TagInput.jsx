import React, { useState } from 'react'
import { MdClose, MdAdd } from 'react-icons/md'

const TagInput = ({tags, setTags}) => {
  const [inputValue, setInputValue] = useState("")

  // Delete function for particular tags
  const handleRemoveTag = (tagToRemove) =>{
    setTags(tags.filter((tag)=> tag !== tagToRemove))
  }

  // input change function for tags
  const handleInputChange = (e) =>{
    console.log("event", e)
    setInputValue(e.target.value)
  }

   // adding new tag
   const addNewTag = () =>{
    if(inputValue.trim() !== ""){
      setTags([...tags, inputValue.trim()])
      setInputValue("")
    }
  }

  // key down
  const handleKeyDown = (e) =>{
    if(e.key === "Enter"){
      addNewTag()
    }
  }
  return (
    <div>
      {tags?.length>0 && (
        <div className='flex items-center gap-2 flex-wrap mt-2'>
          {
            tags.map((tag, index) =>(
              <span key={index} className='flex items-center gap-2 text-sm text-blue-500 bg-slate-100 px-3 py-1 rounded'>
                {console.log("tags are", tag)}
                #{tag}
                <button onClick={()=>{
                  handleRemoveTag(tag)
                }}>
                  <MdClose 
                    className='cursor-pointer text-slate-600 hover:text-red-600 rounded' 
                  />
                </button>
              </span>
            ))
          }
        </div>
      )}
      <div className='flex items-center gap-4 mt-3'>
        <input 
          type="text" 
          value={inputValue} 
          className='text-sm bg-transparent px-3 py-2 rounded outline-none' 
          placeholder='Add Tags...'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700' onClick={()=>{
          addNewTag()
        }}>
          <MdAdd className='text-2xl text-blue-700 hover:text-white'/>
        </button>
      </div>
    </div>
  )
}

export default TagInput