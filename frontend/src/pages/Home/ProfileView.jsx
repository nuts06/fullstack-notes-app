import React, { useEffect, useState } from 'react';
import axios from 'axios'

const ProfileView = () => {
  // get api calling
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState('')
  const [currentPassword, setCurrentPass] = useState('');
  const [newPassword, setNewPass] = useState('');
  const [confirmPassword, setReNewPass] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);

  const userId = localStorage.getItem('userId'); // Or get from props/context
  const userName = localStorage.getItem("userName")
  useEffect(() => {
   
    const fetchPersonalDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/get-personal-details/${userId}`);
        console.log("response is:", response)
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setErrorMsg(response.data.message || 'Failed to fetch user details');
        }
      } catch (error) {
        console.error("Error fetching user details", error);
        setErrorMsg("Something went wrong, please try again later");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPersonalDetails();
    } else {
      setErrorMsg("User ID not found");
      setLoading(false);
    }
  }, [userId]);

  // handle reset password
  const handleResetPassword = async () => {
    alert("reset passsword clicked")
    setResetError(""); // Clear previous errors
    setResetSuccess(""); // Clear previous success
  
    if (!userId) {
      setResetError("User ID not found");
      return;
    }
  
    if (!currentPassword || !newPassword || !confirmPassword) {
      setResetError("All fields are required");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setResetError("New passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/api/auth/reset-password"  , {
        userId,
        currentPassword,
        newPassword,
        confirmPassword
      });
      setShowResetModal(false); // Close the modal on success
  
      setResetSuccess(response.data.message || "Password reset successful");
  
    } catch (err) {
      console.error("Reset password error:", err);
      if (err.response && err.response.data) {
        setResetError(err.response.data.message || "Failed to reset password");
      } else {
        setResetError("An error occurred while resetting password");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">

        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{userName}</h2>
            <p className="text-sm text-gray-600">{user?.contact}</p>
          </div>

          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer">
              Edit
            </button>
            <button onClick={() => setShowResetModal(true)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer">
              Reset Password
            </button>
          </div>
        </div>

        {/* Personal Info - One field per line */}
        <div className="space-y-4">
        <div>
            <label className="text-gray-500 text-sm">Email</label>
            <p className="text-gray-900 font-medium">{user?.email}</p>
          </div>
          <div>
            <label className="text-gray-500 text-sm">Country</label>
            <p className="text-gray-900 font-medium">{user?.country}</p>
          </div>
          <div>
            <label className="text-gray-500 text-sm">State</label>
            <p className="text-gray-900 font-medium">{user?.state}</p>
          </div>
          <div>
            <label className="text-gray-500 text-sm">City</label>
            <p className="text-gray-900 font-medium">{user?.city}</p>
          </div>
          <div>
            <label className="text-gray-500 text-sm">Postal Code</label>
            <p className="text-gray-900 font-medium">{user?.postalcode}</p>
          </div>
        </div>

      </div>
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Reset Password</h2>

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="password"
              placeholder="Re-enter New Password"
              value={confirmPassword}
              onChange={(e) => setReNewPass(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            {resetError && <p className="text-red-600 mb-2">{resetError}</p>}
            {resetSuccess && <p className="text-green-600 mb-2">{resetSuccess}</p>}

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowResetModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleResetPassword} className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      )}    
    </div>
  );
};

export default ProfileView;
