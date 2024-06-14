import React from 'react';

const UserDetailsComponent = ({ user, showUserDetails, logout }) => {
  return (
    <div className="ml-4">
      <div className={`mt-2 ${showUserDetails ? 'block' : 'hidden'}`}>
        <p className="text-gray-600">Email: {user.user.email}</p>
        <p className="text-gray-600">Enrollment: {user.enrollment}</p>
        <p className="text-gray-600">Branch: {user.branch}</p>
        <p className="text-gray-600">Department: {user.department}</p>
        <button className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-110 transition duration-300 ease-in-out" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default UserDetailsComponent;
