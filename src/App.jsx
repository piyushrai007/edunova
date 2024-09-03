import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TeacherDashboard from "./components/user/TeacherDashboard";
import StudentDashboard from "./components/user/StudentDashboard";

const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/teacher-dashboard" || location.pathname === "/student-dashboard";

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
      {!isDashboard && <Footer />}
      <ButtonGradient />
    </div>
  );
};

export default App;