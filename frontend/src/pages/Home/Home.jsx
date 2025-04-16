import React, { useEffect, useState } from 'react'
import Notecard from '../../components/Cards/Notecard'
import Modal from "react-modal"
import AddEditNotes from '../../pages/Home/AddEditNotes'
import { MdAdd } from 'react-icons/md'
import axios from 'axios'

const Home = () => {
  const [notes, setNotes] = useState([])  
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type:'add',
    data:null
  })
  const modelOpen = () =>{
    alert("button clicked")
  }
  const handlePinNote = () =>{
    alert("Pinned")
  } 

  // on edit
  const handleEdit = () =>{
    alert("Created")
  }

  // on delete
  const handleDelete = async (noteId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/notes/${noteId}`);
      
      if (res.data.success) {
        alert("msg deleted successfully")
        getAllNotes()

      } else {
        alert("Failed to delete the note.");
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Something went wrong!");
    }
  };

  const closeModal = () => {
    console.log("Modal is being closed"); // 👈 Add this
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };
  
  const getAllNotes = () =>{
    const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/api/notes/get-all-notes", 
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Add 'Bearer' prefix
            },
          }
        )
        .then((res) => {
          console.log("API Response:", res.data); // Debugging log
    
          if (Array.isArray(res.data.notes)) {
            setNotes(res.data.notes); // ✅ Set only if it's an array
          } else {
            console.error("API did not return an array:", res.data.notes);
            // setNotes([]); // Prevent `undefined` errors
          }
        })
        .catch((err) => {
          console.error("Error fetching notes:", err);
          setNotes([]); // Handle API failure gracefully
        });
  }

  // Fetch Notes API
  useEffect(() => {
    getAllNotes()
  }, []);
 
  const isPinned = true;
  return (
    <>
    <div className='container mx-auto'>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 max-md:m-5'>
      {notes.length > 0 ? (
            notes.map((note) => (
              <Notecard
                key={note?._id ||  Math.random()} // Unique key for each note
                handlePinNote={() => handlePinNote(note?._id)}
                handleEdit={() => handleEdit(note)}
                handleDelete={() => handleDelete(note?._id)}
                content={note?.content}
                tags={note?.tags}
                title={note?.title}
                date={note?.date}
                isPinned={note?.isPinned || false} // Assuming API has `isPinned` field
              />
            ))
          ) : (
            <p>No notes found</p>
          )}
      </div>
    </div>
     {/* add button */}
     <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2B85FF] hover:bg-blue-600 absolute right-10 bottom-10 cursor-pointer' onClick={()=>{
      setOpenAddEditModal({
        isShown:true,
        type:"add",
        data:null
      })
    }}>
      <MdAdd className='text-[32px] text-white'/>
    </button>
    {/* creating add modal */}
    <Modal isOpen={openAddEditModal.isShown} onRequestClose={closeModal} 
    style={{
      overlay:{
        backgroundColor:"rgba(0, 0, 0, 0.2)"
      }
    }}
    contentLabel=''
    className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll custom-scrollbar"
    >
      <AddEditNotes 
        onClose={closeModal}
        noteData={openAddEditModal.data}
        type={openAddEditModal.type}
        setNotes={setNotes}
      />
    </Modal>
    </>
  )
}

export default Home