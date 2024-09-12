import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import data from "./data.json";
import Loading from "../../Loading";
// import  './main.css';

function Main({ isOpen, onRequestClose, classrooms }) {
  console.log(classrooms);
  const quizzes = data.quizzes;
  const [quizData, setQuizData] = useState({
    title: "",
    icon: "",
    iconbg: "",
    questions: [],
  });
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  // State to manage the selected classroom
  const [selectedClassroom, setSelectedClassroom] = useState(classrooms.length > 0 ? classrooms[0] : null);

  // State to manage loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  useEffect(() => {
    // Simulate data fetching delay
    const fetchData = async () => {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, [classrooms]);

  const handleThemeMode = () => {
    setThemeMode((prevThemeMode) =>
      prevThemeMode === "light" ? "dark" : "light"
    );
  };

  // Function to handle classroom selection
  const handleClassroomSelect = (classroom) => {
    setSelectedClassroom(classroom);
  };

  if (loading) {
    return <div><Loading /></div>; // Replace with your loader component or message
  }

  if (classrooms.length === 0) {
    return <div>Nothing to show. Check if you have joined a classroom.</div>;
  }

  return (
    <>
      <Navbar
        themeMode={themeMode}
        classrooms={classrooms}
        selectedClassroom={selectedClassroom}
        onClassroomSelect={handleClassroomSelect}
        setThemeMode={setThemeMode}
        handleThemeMode={handleThemeMode}
        title={quizData.title}
        icon={quizData.icon}
        iconbg={quizData.iconbg}
      />
      
      {/* Single page display of Home component */}
      <Home
        quizzes={quizzes}
        setQuizData={setQuizData}
        classroom={selectedClassroom}
      />
    </>
  );
}

export default Main;