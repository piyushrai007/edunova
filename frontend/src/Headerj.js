import React, { useState } from 'react';
import { FaBell, FaSearch, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Header.css'; // Import custom CSS file for header styling

function Header({ user, onLogoutClick }) {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <header className="header bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <div className="relative">
          {showSearchBar && (
            <input
              type="text"
              placeholder="Search..."
              className="search-input absolute bg-gray-200 text-gray-800 rounded-full py-2 px-4 focus:outline-none shadow-lg"
            />
          )}
          <FaSearch className="cursor-pointer text-xl hover:text-gray-300" onClick={toggleSearchBar} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <FaBell className="cursor-pointer text-2xl hover:text-gray-300" />
        <div className="relative flex items-center cursor-pointer" onClick={toggleUserDetails}>
          <img
            src={user.photo}
            alt="User Photo"
            className="user-photo rounded-full h-12 w-12 border-2 border-white hover:border-teal-500 transition duration-300 ease-in-out"
          />
          {showUserDetails && (
            <div className="user-details-container absolute top-16 right-0 shadow-lg rounded-md p-4 w-64 z-10">
              <div className="flex items-center space-x-3 mb-4">
                <img src={user.photo} alt="User Photo" className="rounded-full h-16 w-16 border-2 border-gray-300" />
                <div>
                  <p className="font-semibold text-lg animate-bounce">{`${user.user.first_name} ${user.user.last_name}`}</p>
                  <p className="text-sm text-gray-500">{user.user.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{user.enrollment}</p>
              <p className="text-sm text-gray-500 mb-4">{user.branch}</p>
              <div className="border-t border-gray-300 pt-4">
                <button
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-300 ease-in-out"
                  onClick={onLogoutClick}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
                <button
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-300 ease-in-out"
                >
                  <FaCog />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
