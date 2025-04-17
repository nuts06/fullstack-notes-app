import React from 'react'
import {FaMagnifyingGlass} from "react-icons/fa6"
import {IoMdClose} from "react-icons/io"


const Searchbar = ({value, onChange, handleSearch , onClearSearch}) => {
    const handleSearchClick = () => {
        // Trim the value before calling the search function
        const trimmedQuery = value.trim();
    
        // Only call handleSearch if the trimmed query is not empty
        if (trimmedQuery) {
          handleSearch(trimmedQuery);
        }
      };
  return (
    <div className='w-40 sm:w-60 md:w-80 flex items-center px-4 bg-slate-100 rounded-md'>
        <input 
            type="text" 
            placeholder='Seacrh Notes..' 
            className='w-full text-xs bg-transparent py-[11px] outline-none'
            value={value}
            onChange={onChange}
        />
        {value && 
            <IoMdClose 
                className='cursor-pointer text-xl hover:text-red-600 text-slate-500 mr-3'
                onClick={onClearSearch}
            />
        }
        <FaMagnifyingGlass 
            className='text-slate-500 text-xl cursor-pointer hover:text-black mr-3'
            onClick={handleSearchClick}
        />
    </div>
  )
}

export default Searchbar