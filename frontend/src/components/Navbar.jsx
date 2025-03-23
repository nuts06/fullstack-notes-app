import React, {useState} from 'react'
import Searchbar from './Searchbar/Searchbar'
import Profileinfo from './Cards/Profileinfo'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className='text-xl font-medium text-black py-2'>
        <span className='text-slate-500'>Venus</span>
        <span className='text-slate-900'>Vibes</span>
      </h2>

      <Searchbar 
        value={searchQuery}

      />
      <Profileinfo />
    </div>
  )
}

export default Navbar