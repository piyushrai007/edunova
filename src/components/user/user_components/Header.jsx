import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import dashboard from "../../../assets/images/dashboard.png";
import email from "../../../assets/images/email.png";
import settings from "../../../assets/images/setting.png";
import logout from "../../../assets/images/logout.png";
import info from "../../../assets/images/information.png";
import logo from "../../../assets/images/logo-letter.png";

function Header({ user, onLogoutClick, toggleSidebar }) {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  const userDetailsRef = useRef(null);

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  const handleThemeMode = () => {
    setThemeMode((prevThemeMode) =>
      prevThemeMode === "light" ? "dark" : "light"
    );
  };

  useEffect(() => {
    const savedThemeMode = localStorage.getItem("themeMode");
    if (savedThemeMode) {
      setThemeMode(savedThemeMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleLogout = () => {
    onLogoutClick();
  };

  const handleClickOutside = (event) => {
    if (
      userDetailsRef.current &&
      !userDetailsRef.current.contains(event.target)
    ) {
      setShowUserDetails(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-100 dark:bg-gray-900 p-4 shadow-md  w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={toggleSidebar}
        >
          <img src={logo} className="h-12 mt-[-15px]" alt="Logo" />
          <div className="mt-3">
            <span className="self-center text-[20px] font-semibold whitespace-nowrap dark:text-white">
              EduNova
            </span>
            <br />
            <span className="text-[12px]">Student Dashboard</span>
          </div>
        </a>

        <div className="flex items-center md:order-2 space-x-2 rtl:space-x-reverse">
          <button type="button" className="relative" onClick={toggleSearchBar}>
            <FaSearch className="text-xl hover:text-gray-500 dark:hover:text-gray-300" />
            {showSearchBar && (
              <input
                type="text"
                placeholder="Search..."
                className="absolute top-full mt-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full py-2 px-4 focus:outline-none shadow-lg transition-all duration-300"
              />
            )}
          </button>

          <FaBell className="cursor-pointer text-2xl hover:text-gray-500  dark:hover:text-gray-300 transition-colors" />
         
          <div className="relative" ref={userDetailsRef}>
            <button
              type="button"
              className="flex items-center space-x-2"
              onClick={toggleUserDetails}
            >
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src={user.photo}
                alt="User Avatar"
                height={40}
                width={40}
              />
              {/* <IoMdArrowDropdown className="text-xl text-gray-500 dark:text-gray-300" /> */}
            </button>
            {showUserDetails && (
              <div className="absolute right-[-47px] mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-20">
                <div className="px-4 py-3 mt-5 ml-4">
                  <div className="flex">
                    
                    <div className="ml-4">
                      <span className="block text-gray-900 dark:text-white text-xl">
                        {`${user.user.first_name} ${user.user.last_name}`}
                      </span>
                      <p>Student</p>
                      <div className="flex items-center">
                        <img
                          src={email}
                          alt=""
                          height={10}
                          width={15}
                          className="mr-2"
                        />
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400 text-[12px] mb-2">
                          {user.user.email}
                        </span>
                      </div>
                      <button className="font-bold rounded-md px-1 py-1 bg-green-100 text-green-400">
                        + Classroom
                      </button>
                      <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={handleThemeMode}
          >
            {themeMode === "dark" ? (
              <span className="text-2xl">🌙</span>
            ) : (
              <span className="text-2xl">☀️</span>
            )}
          </button>
                      
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.user.phone}
                      </span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.user.address}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <img
                    src={settings}
                    alt="Edit Profile"
                    className="w-4 h-4 mr-2"
                  />
                  Edit Profile
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <img
                    src={settings}
                    alt="Customize"
                    className="w-4 h-4 mr-2"
                  />
                  Customize
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <img src={settings} alt="Settings" className="w-4 h-4 mr-2" />
                  Settings
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <img src={info} alt="Help" className="w-4 h-4 mr-2" />
                  Help
                </a>
                <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red dark:hover:red-500"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
              </div>
            )}
          </div>

         
        </div>
      </div>
    </nav>
  );
}

export default Header;
