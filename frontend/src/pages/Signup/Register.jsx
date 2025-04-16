import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import RegisterBackground from "../../assets/images/venusregister.jpg"
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/send-otp', { email });
      localStorage.setItem("emailForOTP", email);
      toast.success(response.data.message || "Natasha", {
        position: "top-right",
        autoClose: 3000, 
      });
      setTimeout(() => navigate("/verify-otp"), 3000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || err.response.data.message || 'Something went wrong');
      } else {
        setError('Network error. Please try again.');
      }
    }
  };
    return (
        <div className="relative w-full h-screen">
          {/* Background Image */}
          <img 
            className="fixed top-0 left-0 w-full h-full object-cover -z-10" 
            src={RegisterBackground} 
            alt="Background" 
          />
    
          {/* Form Container */}
          <div className="flex justify-center items-center h-full px-4">
          <form onSubmit={handleSubmit}>
              <h2 className="text-4xl font-semibold mb-6 text-center text-white">Register</h2>
    
              <label className="block mb-2 text-white">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your email"
                required 
              />
              {error && <p className="text-red-500 mb-4">{error}</p>}
    
              <button 
                type="submit" 
                className="w-full text-white p-3 rounded bg-orange-700 transition-all cursor-pointer"
              >
                Submit
              </button>
              <p className='text-sm text-center mt-4 text-white'>Already have an account? {" "}<Link to={"/login"} className='font-medium underline text-[#2B85FF]'>Log in</Link></p>
            </form>
          </div>
          <ToastContainer />
        </div>
      ) 
}

export default Register