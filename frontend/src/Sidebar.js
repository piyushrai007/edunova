import React from 'react';
import { FaChalkboardTeacher, FaBlog } from 'react-icons/fa';

function Sidebar({ onClassroomClick, onBlogsClick, onDashboardClick }) {
  return (
    <div className="sidebar bg-gradient-to-r from-blue-500 to-indigo-600 text-black shadow-xl rounded-lg p-6">
      <nav>
        <ul className="space-y-4">
          <li>
            <button onClick={onDashboardClick} className="sidebar-button">
              <FaChalkboardTeacher className="sidebar-icon" /> Dashboard
            </button>
          </li>
          <li>
            <button onClick={onClassroomClick} className="sidebar-button">
              <FaChalkboardTeacher className="sidebar-icon" /> Classroom
            </button>
          </li>
          <li>
            <button onClick={onBlogsClick} className="sidebar-button">
              <FaBlog className="sidebar-icon" /> Blogs
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
