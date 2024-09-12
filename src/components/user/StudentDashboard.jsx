import React, { useEffect, useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable'; // Import the swipeable hook
import api from '../api/api';
import './user_components/StudentDashboard.css';
import Modal from 'react-modal';
import Loading from './Loading';
import MyQuillComponent from './user_components/blogs';
import { BlogChart, UserBlogs } from './user_components/userblogs';
import {Sidebar} from './user_components/Sidebar';
import Header from './user_components/Header';
import Footer from './user_components/Footer';
import ClassroomModal from './user_components/ClassroomModal';
import Classroom from './user_components/Classroom';
import DummyChartsComponent from './user_components/carts';
import Main from './user_components/quiz/main';
import SunMoon from '../sunmoon';

Modal.setAppElement('#root');

function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [classroomCode, setClassroomCode] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [resources, setResources] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [messages, setMessages] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  const sections = ['dashboard', 'classroom', 'blogs', 'quiz']; // Define available sections
  const sidebarRef = useRef(null);

  const fetchBlogs = async () => {
    try {
      const username = localStorage.getItem('username');
      if (!username) throw new Error('Username not found');
      const response = await api.get(`/blogs/?author=${username}`, { timeout: 50000 });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      try {
        const response = await api.get('current-user/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUser(response.data);
        await fetchClassrooms(response.data.id);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };

    const fetchClassrooms = async (userId) => {
      try {
        const response = await api.get(`students/${userId}/classrooms/`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        const classroomsWithDetails = await Promise.all(response.data.map(async classroom => {
          const [resources, lectures] = await Promise.all([
            fetchResources(classroom.id),
            fetchLectures(classroom.id)
          ]);
          return { ...classroom, resources, lectures };
        }));
        setClassrooms(classroomsWithDetails);
      } catch (error) {
        console.error('Error fetching classrooms', error);
      }
    };

    const fetchResources = async (classroomId) => {
      try {
        const response = await api.get(`classrooms/${classroomId}/resources/`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching resources', error);
      }
    };

    const fetchLectures = async (classroomId) => {
      try {
        const response = await api.get(`classrooms/${classroomId}/lectures/`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching lectures', error);
      }
    };

    fetchUser();
    fetchBlogs();
  }, []);

  useEffect(() => {
    const handleFirstVisit = () => {
      const isFirstVisit = localStorage.getItem('isFirstVisit');
      const isMobile = window.innerWidth < 768;

      if (!isFirstVisit && isMobile) {
        setIsFirstVisit(true);
        localStorage.setItem('isFirstVisit', 'false');
      }
    };

    handleFirstVisit();
  }, []);

  const joinClassroom = async () => {
    try {
      const response = await api.post(`students/${user.id}/join_classroom/`, {
        classroom_code: classroomCode,
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setClassrooms(prevClassrooms => [...prevClassrooms, response.data]);
      setModalIsOpen(false);
      setClassroomCode('');
    } catch (error) {
      console.error('Error joining classroom', error);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  const handleSwipe = (direction) => {
    const currentIndex = sections.indexOf(selectedSection);
    if (direction === 'LEFT' && currentIndex < sections.length - 1) {
      setSelectedSection(sections[currentIndex + 1]);
    } else if (direction === 'RIGHT' && currentIndex > 0) {
      setSelectedSection(sections[currentIndex - 1]);
    }else if (direction === 'LEFT' && currentIndex === 0) {
      setIsSidebarOpen(true);
    }
    

  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('LEFT'),
    onSwipedRight: () => handleSwipe('RIGHT'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  

  if (!user) {
    return <SunMoon />;
  }

  return (
    <div
      className={`flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${isFirstVisit ? 'left-swipe-animation' : ''}`}
      {...swipeHandlers} // Attach swipe handlers to the container
    >
      <Header
        user={user}
        onLogoutClick={logout}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 ">
        <Sidebar
          onDashboardClick={() => setSelectedSection('dashboard')}
          onClassroomClick={() => setSelectedSection('classroom')}
          onBlogsClick={() => setSelectedSection('blogs')}
          onQuizClick={() => setSelectedSection('quiz')}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isOpen={isSidebarOpen}
          user={user}
          onLogoutClick={logout}
          ref={sidebarRef}
        />

        <main className="flex-1 p-4 md:p-6">
          <div className="content">
            {/* Render content based on the selected section */}
            {selectedSection === 'classroom' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-indigo-700">Your Classrooms</h2>
                  <button
                    id="joinClassroomButton"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-2 px-4 md:px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300 ease-in-out mt-3 md:mt-0"
                    onClick={() => setModalIsOpen(true)}
                  >
                    + Join Classroom
                  </button>
                </div>
                <ClassroomModal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                  classroomCode={classroomCode}
                  setClassroomCode={setClassroomCode}
                  joinClassroom={joinClassroom}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                  {classrooms.map(classroom => (
                    <Classroom
                      key={classroom.id}
                      classroom={classroom}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                      messages={messages}
                    />
                  ))}
                </div>
              </div>
            )}

            {selectedSection === 'blogs' && (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-700">Create a Blog</h1>
                <MyQuillComponent />
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-700">Your Blogs</h1>
                <UserBlogs blogs={blogs} fetchBlogs={fetchBlogs} />
              </div>
            )}

            {selectedSection === 'quiz' && (
              <Main isOpen={isQuizOpen} onRequestClose={() => setIsQuizOpen(false)} classrooms={classrooms} />
            )}

            {selectedSection === 'dashboard' && (
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-between mx-auto">
                  <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-pink-400 pr-5 text-2xl md:text-3xl text-gradient font-bold">
                    Welcome! {user.user.first_name}
                  </h1>
                  <h1 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Dashboard</h1>
                </div>
                <section className="text-gray-700 body-font dark:text-gray-200 mb-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-4">Your Blogs Analysis</h2>
                  <div className="w-full overflow-x-auto">
                    <BlogChart blogs={blogs} />
                  </div>
                </section>
                <section className="text-gray-700 body-font dark:text-gray-200 mb-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-4">Your Academic Performance</h2>
                  <div className="w-full overflow-x-auto">
                    <DummyChartsComponent />
                  </div>
                </section>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default StudentDashboard;