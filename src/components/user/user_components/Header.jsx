import React, { useState } from 'react';
import { FaBell, FaSearch, FaCog, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { edunova } from "../../../assets";


function Header({ user, onLogoutClick }) {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
console.log('Header - User:', user.photo);
  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  //   document.documentElement.classList.toggle('dark');
  // };

  const handleLogout = () => {
    onLogoutClick();
  };

  return (
    <nav className={`bg-white border-gray-100 dark:bg-gray-900 p-4`}>
      <div className="max-w-screen- flex flex-wrap items-center justify-between mx-auto">
        <a href="#" className="flex space-x-10 rtl:space-x-reverse">
          <img src={edunova}      className="h-10" alt="Logo" />
          <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-pink-400 pr-5 text-3xl text-gradient font-bold">Welcome! {user.user.first_name}</h1>
        </a>

        <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
          <button type="button" className="relative" onClick={toggleSearchBar}>
            <FaSearch className="text-xl hover:text-gray-500 dark:hover:text-gray-300" />
            {showSearchBar && (
              <input
                type="text"
                placeholder="Search..."
                className="absolute top-full mt-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full py-2 px-4 focus:outline-none shadow-lg"
              />
            )}
          </button>

          <FaBell className="cursor-pointer text-2xl hover:text-gray-500 dark:hover:text-gray-300" />

          <div className="relative">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={toggleUserDetails}
            >
              <img className="w-8 h-8 rounded-full" src={user.photo} alt="user photo" />
            </button>

            {showUserDetails && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{`${user.user.first_name} ${user.user.last_name}`}</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.user.email}</span>
                </div>
                <ul className="py-2">
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleLogout}>
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
            <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </button>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex md:order-1 md:w-auto" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" className="block py-1 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:md:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-1 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href="#" className="block py-1 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
            </li>
            <li>
              <a href="#" className="block py-1 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
            </li>
            <li>
              <a href="#" className="block py-1 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
