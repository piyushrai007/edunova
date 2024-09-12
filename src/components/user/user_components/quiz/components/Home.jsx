import { useState } from "react";
import pwaImage from "/pwa-512x512.png";
import html from "/icon-html.svg";
import Quiz from "./QuizPage"; // Import the Quiz component

const Home = ({ quizzes, setQuizData, classroom }) => {
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [formattedQuizData, setFormattedQuizData] = useState(null); // Renamed the state hook

  const handleSelectedLecture = (lec) => {
    setSelectedLecture(lec);
  };

  const handleAttemptQuiz = (mcqs, lec) => {
    const formattedData = formatMCQData(mcqs, lec);
    setQuizData(formattedData);
    console.log(formattedData);
    setFormattedQuizData(formattedData);
    setShowQuiz(true);
  };

  const formatMCQData = (mcqString, lec) => {
    // Split the string into individual questions based on the pattern "\n\n<digit>. "
    const questionBlocks = mcqString.trim().split(/\n\n\d+\.\s+/).filter(Boolean);

    const questions = questionBlocks.map((block) => {
      const lines = block.split("\n").filter(Boolean);
      const question = lines[0]; // First line is the question
      const options = lines.slice(1, lines.length - 1); // Middle lines are the options
      const answerLine = lines[lines.length - 1]; // Last line is the answer
      const answer = answerLine.split("Answer: ")[1].trim().replace(/^[A-D]\.\s*/, ""); // Extract and clean the answer

      return {
        question: question,
        options: options.map((opt) => opt.replace(/^[A-D]\.\s*/, "").trim()), // Clean option format
        answer: answer,
      };
    });

    return {
      title: lec.name,
      icon: html,
      iconbg: "#FFF1E9", // Default background color for icon
      questions: questions,
    };
  };

  return (
    <main className="mx-auto mt-8 px-6 text-xl sm:px-16 xl:flex xl:w-full xl:items-start xl:px-0">
      {!showQuiz ? (
        <>
          <section className="flex flex-col gap-4 xl:w-1/2">
            <h2 className="flex flex-col text-[20px] leading-tight sm:text-[64px]">
              <span className="font-extralight">Welcome to the {classroom.name} </span>
              <span className="font-medium">classroom!</span>
            </h2>
            <h3 className="text-[14px] font-light italic leading-normal text-greyNavy dark:text-lightBluish sm:text-xl">
              classroom code is {classroom.code}!
            </h3>
            {selectedLecture && (
              <section className="mt-8 p-4 bg-gray-100 rounded-xl dark:bg-navy sm:p-6 xl:mt-0 xl:w-full">
                <h3 className="text-xl font-semibold">{selectedLecture.name} Summary</h3>
                <p className="mt-2 text-base">{selectedLecture.response.summary}</p>
                <button
                  className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-white"
                  onClick={() => handleAttemptQuiz(selectedLecture.response.mcqs, selectedLecture)}
                >
                  attempt quiz
                </button>
              </section>
            )}
          </section>

          <section className="mt-10 flex flex-col gap-3 sm:gap-6 xl:mt-0 xl:w-1/2 xl:items-end">
            {classroom.lectures.map((lec) => {
              return (
                <div
                  key={lec.id}
                  className="flex h-16 cursor-pointer items-center gap-4 rounded-xl bg-white p-3 drop-shadow-sm transition-all duration-200 ease-in-out hover:opacity-75 dark:bg-navy sm:h-20 sm:gap-8 sm:rounded-3xl xl:h-24 xl:w-[564px] xl:p-5"
                  onClick={() => handleSelectedLecture(lec)}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-md sm:h-14 sm:w-14 sm:rounded-xl"
                    style={{ backgroundColor: lec.id }}
                  >
                    <img
                      src={pwaImage}
                      alt={lec.date_time.split("T")[0]}
                      className="h-7 w-7 sm:h-10 sm:w-10"
                    />
                  </div>
                  <p className="text-sm font-medium sm:text-[28px]">
                    {lec.name}! {lec.date_time.split("T")[0]}
                  </p>
                </div>
              );
            })}
          </section>
        </>
      ) : (
        <Quiz mcqs={formattedQuizData} />
      )}
    </main>
  );
};

export default Home;
