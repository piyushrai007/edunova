import React from 'react';

const HeaderComponent = ({ user, toggleUserDetails, showUserDetails, logout }) => {
  let usernameLetters = [];
  if (user && user.user && user.user.username) {
    usernameLetters = user.user.username.split('');
  }

  return (
    <div className="flex items-center justify-center mb-8">
      <img
        src={user.photo}
        alt="User Photo"
        className="user-photo rounded-full h-16 w-16 border-4 border-purple-700 hover:border-teal-500 transition duration-300 ease-in-out cursor-pointer"
        onClick={toggleUserDetails}
      />
      <div className="ml-4">
        <h1 className="text-3xl font-bold text-purple-700">
          Welcome,{' '}
          <span className="typing-animation text-teal-600">
            {usernameLetters.map((char, index) => (
              <span key={index} style={{ animation: `appear 2s ${index * 0.5}s infinite` }}>{char}</span>
            ))}
          </span>
        </h1>
        <div className={`mt-2 ${showUserDetails ? 'block' : 'hidden'}`}>
          <p className="text-gray-600">Email: {user.user.email}</p>
          <p className="text-gray-600">Enrollment: {user.enrollment}</p>
          <p className="text-gray-600">Branch: {user.branch}</p>
          <p className="text-gray-600">Department: {user.department}</p>
          <button className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-110 transition duration-300 ease-in-out" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
