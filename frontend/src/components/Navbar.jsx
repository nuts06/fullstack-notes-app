import React, {useState} from 'react'
import Searchbar from './Searchbar/Searchbar'
import Profileinfo from './Cards/Profileinfo'
import { useNavigate, Link } from 'react-router-dom';
import { useEffect} from 'react';
import axios from 'axios'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  // const [buttonText, setButtontext] = useState('Logout')
  const [name, setName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [notes, setNotes] = useState([]);

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

  // integrating search api
  const handleSearch = async (query) => {
    console.log("Search query:", query); // Log the query

  if (!query || typeof query !== 'string') {
    setIsSearching(false);
    return;
  }

  const trimmedQuery = query.trim();
    try {
      const token = localStorage.getItem("token"); // or wherever you store the JWT
      const res = await axios.get("http://localhost:3000/api/notes/search", {
        params: { q: trimmedQuery },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data.notes);
      setIsSearching(true); // show only search results
  
      console.log(res.data.notes); // do something with the search results
    } catch (err) {
      console.error("Search error:", err.response?.data || err.message);
    }
  };

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
        handleSearch ={handleSearch }
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