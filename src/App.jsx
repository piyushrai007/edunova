import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TeacherDashboard from "./components/user/TeacherDashboard";
import StudentDashboard from "./components/user/StudentDashboard";
import Blogs from "./components/Blogs";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PWAInstallPrompt from './components/PWAInstallPrompt.jsx'; // Import the PWAInstallPrompt component
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Collaboration from './components/Collaboration';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Roadmap from './components/Roadmap';
import Signup from './components/Signup';
import Login from './components/Login';
import ButtonGradient from "./assets/svg/ButtonGradient";

const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/teacher-dashboard" || location.pathname === "/student-dashboard";

  // Track the current route to trigger PWA prompt only on '/'
  useEffect(() => {
    if (location.pathname === '/' && !localStorage.getItem('pwaPromptShown')) {
      localStorage.setItem('pwaPromptShown', 'true');
    }
  }, [location.pathname]);

  return (
    <div className={`${!isDashboard ? "pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden" : ""}`}>
      {!isDashboard && <Header />}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Benefits />
            <Collaboration />
            <Services />
            <Pricing />
            <Roadmap />
          </>
        } />
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
      {!isDashboard && <Footer />}
      <ButtonGradient />
      {location.pathname === '/' && !localStorage.getItem('pwaPromptShown') && <PWAInstallPrompt />} {/* PWAInstallPrompt only on the '/' route */}
      <ToastContainer />
    </div>
  );
};

export default App;
