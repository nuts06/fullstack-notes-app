import React from 'react';

const ProfileView = () => {
  const user = {
    name: "John Doe",
    contact: "+91 9876543210",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    postalCode: "400001",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">

        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.contact}</p>
          </div>

          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Reset Password
            </button>
          </div>
        </div>

        {/* Personal Info - One field per line */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-500 text-sm">Country</label>
            <p className="text-gray-900 font-medium">{user.country}</p>
          </div>
          <div>
            <label className="text-gray-500 text-sm">State</label>
            <p className="text-gray-900 font-medium">{user.state}</p>
          </div>
          <div>
            <label className="text-gray-500 text-sm">City</label>
            <p className="text-gray-900 font-medium">{user.city}</p>
          </div>
          <div>
            <label className="text-gray-500 text-sm">Postal Code</label>
            <p className="text-gray-900 font-medium">{user.postalCode}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileView;
