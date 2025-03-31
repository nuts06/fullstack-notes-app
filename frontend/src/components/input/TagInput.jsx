import React from 'react'
import { MdClose } from 'react-icons/md'

const TagInput = ({tags, setTags}) => {
  const handleRemoveTag = (tagToRemove) =>{
    setTags(tags.filter((tag)=> tag !== tagToRemove))
  }
  return (
    <div>
      {tags?.length>0 && (
        <div className='flex items-center gap-2 flex-wrap mt-2'>
          {
            tags.map((tag, index) =>(
              <span key={index} className='flex items-center gap-2 text-sm text-blue-500 bg-slate-100 px-3 py-1 rounded'>
                {console.log("tags are", tag)}
                # {tag}
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
    </div>
  )
}

export default TagInput