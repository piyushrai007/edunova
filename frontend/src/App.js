import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Dashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import Login from "./login"; // Changed "./Login" to "./login"
import "./index.css";
import LandingPage from './LandingPage';
import BlogList from './publicblogs.js';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<Dashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/" element={<LandingPage />} />{/* Default route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

