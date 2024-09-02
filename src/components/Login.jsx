import React, { useEffect, useState } from 'react';
import api from './api/api';
import './user_components/StudentDashboard.css';
import Modal from 'react-modal';
import Loading from './Loading';
import MyQuillComponent from './user_components/blogs';
import { BlogChart, UserBlogs } from './user_components/userblogs';
import Sidebar from './user_components/Sidebar';
import Header from './user_components/Header';
import Footer from './user_components/Footer';
import ClassroomModal from './user_components/ClassroomModal';
import Classroom from './user_components/Classroom';
import DummyChartsComponent from './user_components/carts';

Modal.setAppElement('#root');

function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [classroomCode, setClassroomCode] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [resources, setResources] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [messages, setMessages] = useState({});
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For responsive sidebar

  const fetchBlogs = async () => {
    try {
      let username = localStorage.getItem('username');
      console.log('userblogs - Username:', username);
      const response = await fetch(`https://backend-nfkn.onrender.com/api/blogs/?=${username}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log('Fetched blogs:', data);
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs', error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      try {
        const response = await api.get('current-user/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
        fetchClassrooms(response.data.id);
        fetchResources();
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };

    const fetchClassrooms = async (userId) => {
      try {
        const response = await api.get(`students/${userId}/classrooms/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const classroomsWithDetails = await Promise.all(response.data.map(async classroom => {
          const resources = await fetchResources(classroom.id);
          const lectures = await fetchLectures(classroom.id);
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
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching resources', error);
      }
    };

    const fetchLectures = async (classroomId) => {
      try {
        const response = await api.get(`classrooms/${classroomId}/lectures/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching lectures', error);
      }
    };

    fetchUser();
  }, []);

  const joinClassroom = async () => {
    try {
      const response = await api.post(`students/${user.id}/join_classroom/`, {
        classroom_code: classroomCode,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setClassrooms(prevClassrooms => [...prevClassrooms, response.data]);
      setModalIsOpen(false);
      setClassroomCode('');
    } catch (error) {
      console.error('Error joining classroom', error);
    }
  };

  const checkAnswer = (question, index) => {
    if (selectedOptions[index] === question.correct_answer.charAt(0)) {
      setMessages(prevMessages => ({ ...prevMessages, [index]: 'Congrats you got it!!!!' }));
    } else {
      setMessages(prevMessages => ({ ...prevMessages, [index]: `Correct answer is: ${question.correct_answer}` }));
    }
  };

  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }

  if (!user) {
    return (
      <Loading />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header user={user} onLogoutClick={logout} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex">
        <Sidebar
          onDashboardClick={() => setSelectedSection('dashboard')}
          onClassroomClick={() => setSelectedSection('classroom')}
          onBlogsClick={() => setSelectedSection('blogs')}
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 p-6">
          <div className="content">
            {selectedSection === 'classroom' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-indigo-700">Your Classrooms</h2>
                  <button
                    id="joinClassroomButton"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {classrooms.map(classroom => (
                    <Classroom
                      key={classroom.id}
                      classroom={classroom}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                      checkAnswer={checkAnswer}
                      messages={messages}
                    />
                  ))}
                </div>
              </div>
            )}

            {selectedSection === 'blogs' && (
              <div>
                <h1 className="text-3xl font-bold mb-4 text-indigo-700">Create a Blog</h1>
                <MyQuillComponent />
                <h1 className="text-3xl font-bold mb-4 text-indigo-700">Your Blogs</h1>
                <UserBlogs blogs={blogs} fetchBlogs={fetchBlogs} />
              </div>
            )}

            {selectedSection === 'dashboard' && (
              <div>
                <h1 className="text-3xl font-bold mb-4 text-indigo-700">Dashboard</h1>
                <section className="text-gray-700 body-font dark:text-gray-200">
                  <h2 className="text-lg font-semibold mb-4">Your Blogs Analysis</h2>
                  <BlogChart blogs={blogs} />
                </section>
                <section className="text-gray-700 body-font dark:text-gray-200">
                  <h2 className="text-lg font-semibold mb-4">Your Academic Performance</h2>
                  <DummyChartsComponent />
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
