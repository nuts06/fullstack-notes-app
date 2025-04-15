import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import RegisterBackground from "../../assets/images/venusregister.jpg"
import { ToastContainer, toast } from 'react-toastify';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/verify-otp',{
        otp,
        email: localStorage.getItem("emailForOTP")
      });
      setError('');
      // setMessage(response.data.message || 'OTP sent successfully!');
      toast.success(response.data.message || "Natasha", {
        position: "top-right",
        autoClose: 3000, 
      });
      const userId = response.data.userId;
      localStorage.setItem("userId", userId);
      setTimeout(() => navigate("/personal-details"), 3000);
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
              <h2 className="text-4xl font-semibold mb-6 text-center text-white">Verify OTP</h2>
    
              <label className="block mb-2 text-white">OTP</label>
              <input 
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your otp"
                required 
              />
              {error && <p className="text-red-500 mb-4">{error}</p>}
    
              <button 
                type="submit" 
                className="w-full text-white p-3 rounded hover:bg-orange-700 transition-all cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      ) 
}

export default VerifyOtp