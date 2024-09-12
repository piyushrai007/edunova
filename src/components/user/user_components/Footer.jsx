import React from 'react';

function Footer({ isDarkMode }) {
  return (
    <footer
      className={`footer p-4 text-center ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
      } hidden md:block tbl:block`}
    >
      <p>&copy; 2024 Student Dashboard. All rights reserved.</p>
    </footer>
  );
}

export default Footer;