import React, { forwardRef ,useState} from 'react';
import dashboard from '../../../assets/images/dashboard.png';
import email from '../../../assets/images/email.png';
import settings from '../../../assets/images/setting.png';
import logout from '../../../assets/images/logout.png';
import info from '../../../assets/images/information.png';

// Import Ionicons for mobile app icons
import { IonIcon } from '@ionic/react';
import { homeOutline, schoolOutline, newspaperOutline, logOutOutline, settingsOutline } from 'ionicons/icons';

export const Sidebar = forwardRef(({ onDashboardClick, onClassroomClick, onBlogsClick, onQuizClick, isOpen, toggleSidebar, user, onLogoutClick }, ref) => {
  const handleOptionClick = (callback) => {
    callback();
    toggleSidebar();
  };
  const [selectedOption, setSelectedOption] = useState('dashboard');

  const handleOptionClickk = (option, callback) => {
    setSelectedOption(option);
    callback();
  };

  return (
    <>  
      {/* Toggle Button */}
      <button ref={ref} onClick={toggleSidebar} className={`fixed top-10 left-2 z-50 p-2 bg-indigo-600 text-white rounded-full ${isOpen ? 'hidden' : 'block'}`}>
        ➤
      </button>

      {/* Sidebar for larger screens */}
      <aside className={`fixed top-20 left-0 h-full w-64 bg-gray-800 dark:bg-gray-900 z-40 shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:block hidden`}>
        <nav className="flex flex-col p-4 space-y-4">
          {/* User Profile Section */}
          <div className="flex flex-col items-center mb-4 text-white">
            <img className="w-16 h-16 rounded-full bg-white" src={user.photo} alt="User" />
            <span className="text-lg font-bold mt-2">{user.user.first_name} {user.user.last_name}</span>
            <span className="text-sm">Student</span>
            <button className="mt-4 px-2 py-1 rounded-md bg-green-100 text-green-600" onClick={onLogoutClick}>
              Logout
            </button>
          </div>

          {/* Sidebar Options */}
          <button onClick={() => handleOptionClick(onDashboardClick)} className="w-full text-left text-white dark:text-gray-300 font-semibold hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg p-2 transition-colors flex items-center">
            <img src={dashboard} className="w-6 h-6 mr-3" alt="Dashboard" />
            Dashboard
          </button>
          <button onClick={() => handleOptionClick(onClassroomClick)} className="w-full text-left text-white dark:text-gray-300 font-semibold hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg p-2 transition-colors flex items-center">
            <img src={email} className="w-6 h-6 mr-3" alt="Classrooms" />
            Classrooms
          </button>
          <button onClick={() => handleOptionClick(onBlogsClick)} className="w-full text-left text-white dark:text-gray-300 font-semibold hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg p-2 transition-colors flex items-center">
            <img src={settings} className="w-6 h-6 mr-3" alt="Blogs" />
            Blogs
          </button>
          <button onClick={() => handleOptionClick(onQuizClick)} className="w-full text-left text-white dark:text-gray-300 font-semibold hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg p-2 transition-colors flex items-center">
            <img src={logout} className="w-6 h-6 mr-3" alt="Quiz" />
            Quiz
          </button>
          <button onClick={() => handleOptionClick(onLogoutClick)} className="w-full text-left text-white dark:text-gray-300 font-semibold hover:bg-red-600 dark:hover:bg-red-500 rounded-lg p-2 transition-colors flex items-center">
            <img src={info} className="w-6 h-6 mr-3" alt="Sign Out" />
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Bottom Navigation for Mobile Screens */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 dark:bg-gray-900 p-2 flex justify-around lg:hidden">
      <button
        onClick={() => handleOptionClickk('dashboard', onDashboardClick)}
        className={`text-2xl ${selectedOption === 'dashboard' ? 'text-yellow-500' : 'text-white'}`}
      >
        <IonIcon icon={homeOutline} />
      </button>
      <button
        onClick={() => handleOptionClickk('classroom', onClassroomClick)}
        className={`text-2xl ${selectedOption === 'classroom' ? 'text-yellow-500' : 'text-white'}`}
      >
        <IonIcon icon={schoolOutline} />
      </button>
      <button
        onClick={() => handleOptionClickk('blogs', onBlogsClick)}
        className={`text-2xl ${selectedOption === 'blogs' ? 'text-yellow-500' : 'text-white'}`}
      >
        <IonIcon icon={newspaperOutline} />
      </button>
      <button
        onClick={() => handleOptionClickk('quiz', onQuizClick)}
        className={`text-2xl ${selectedOption === 'quiz' ? 'text-yellow-500' : 'text-white'}`}
      >
        <IonIcon icon={settingsOutline} />
      </button>
      <button
        onClick={() => handleOptionClickk('logout', onLogoutClick)}
        className={`text-2xl ${selectedOption === 'logout' ? 'text-yellow-500' : 'text-white'}`}
      >
        <IonIcon icon={logOutOutline} />
      </button>
    </div>
    </>
  );
});
