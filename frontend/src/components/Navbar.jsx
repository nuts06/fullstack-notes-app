import React, {useState} from 'react'
import Searchbar from './Searchbar/Searchbar'
import Profileinfo from './Cards/Profileinfo'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [buttonText, setButtontext] = useState('Logout')
  const navigate = useNavigate()
  const handleSeacrh = ()=>{
    alert("Searched")
  }

  const onClearSearch = ()=>{
    setSearchQuery("")
  }

  const onLogout  = () =>{
    navigate('/login')
    setButtontext("Login")
    
  }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className='text-xl font-medium text-black py-2'>
        <span className='text-slate-500'>Venus</span>
        <span className='text-slate-900'>Vibes</span>
      </h2>

      <Searchbar 
        value={searchQuery}
        onChange={({target})=> setSearchQuery(target.value)}
        handleSeacrh={handleSeacrh}
        onClearSearch={onClearSearch}
      />
      <Profileinfo 
        onLogout={onLogout}
        Buttontext={buttonText}
      />
    </div>
  )
}

export default Navbar