import React, {useState} from 'react'
import Searchbar from './Searchbar/Searchbar'
import Profileinfo from './Cards/Profileinfo'
import { useNavigate, Link } from 'react-router-dom';
import { useEffect} from 'react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  // const [buttonText, setButtontext] = useState('Logout')
  const [name, setName] = useState('');

  // useEffect(() => {
  //   const storedName = localStorage.getItem("userName");
  //   if (storedName) {
  //     setName(storedName);
  //   }
  // }, []);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
    }
  
    // Listen for custom login event
    const handleLogin = () => {
      const updatedName = localStorage.getItem("userName");
      setName(updatedName);
    }
  
    window.addEventListener("userLoggedIn", handleLogin);
  
    return () => {
      window.removeEventListener("userLoggedIn", handleLogin);
    }
  }, []);
  

  const navigate = useNavigate()
  const handleSeacrh = ()=>{
    alert("Searched")
  }

  const onClearSearch = ()=>{
    setSearchQuery("")
  }

  const onLogout  = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setName('');
    navigate('/login');
  }

  const buttonText = name ? 'Logout' : 'Login'

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to="/">
      <h2 className='text-xl font-medium text-black py-2'>
        <span className='text-slate-500'>Venus</span>
        <span className='text-slate-900'>Vibes</span>
      </h2>
      </Link>

      <Searchbar 
        value={searchQuery}
        onChange={({target})=> setSearchQuery(target.value)}
        handleSeacrh={handleSeacrh}
        onClearSearch={onClearSearch}
      />
      <Profileinfo 
        name={name}
        onLogout={onLogout}
        Buttontext={buttonText}
      />
    </div>
  )
}

export default Navbar