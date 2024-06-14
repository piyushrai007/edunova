import React from 'react';

function Classroom({ classroom, selectedOptions, setSelectedOptions, checkAnswer, messages }) {
  return (
    <div key={classroom.id} className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="font-bold text-xl mb-2 text-purple-700">{classroom.name}</h3>
      <p className="text-gray-700 mb-4">Code: {classroom.code}</p>
      <div className="mb-4">
        <h4 className="text-lg font-bold text-green-700">Resources</h4>
        {classroom.resources.map(resource => (
          <div key={resource.id} className="mb-2">
            <a href={resource.file} download className="text-blue-500 hover:underline">{resource.name}</a>
          </div>
        ))}
      </div>
      <div>
        <h4 className="text-lg font-bold text-yellow-700">Lectures</h4>
        {classroom.lectures.map(lecture => (
          <div key={lecture.id} className="mb-4">
            <div className="font-bold text-gray-800">Date: {lecture.date_time}</div>
            <div className="text-sm text-gray-600">{lecture.name}</div>
            <div className="text-sm text-gray-600">{lecture.response.summary}</div>
            {lecture.response.questions.map((question, index) => (
              <div key={index} className="mt-2">
                <p className="text-gray-800">{question.text}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <label>
                    <input type="radio" value="A" checked={selectedOptions[index] === 'A'} onChange={() => setSelectedOptions(prevOptions => ({ ...prevOptions, [index]: 'A' }))} />
                    <span className="ml-2">A</span>
                  </label>
                  <label>
                    <input type="radio" value="B" checked={selectedOptions[index] === 'B'} onChange={() => setSelectedOptions(prevOptions => ({ ...prevOptions, [index]: 'B' }))} />
                    <span className="ml-2">B</span>
                  </label>
                  <label>
                    <input type="radio" value="C" checked={selectedOptions[index] === 'C'} onChange={() => setSelectedOptions(prevOptions => ({ ...prevOptions, [index]: 'C' }))} />
                    <span className="ml-2">C</span>
                  </label>
                  <label>
                    <input type="radio" value="D" checked={selectedOptions[index] === 'D'} onChange={() => setSelectedOptions(prevOptions => ({ ...prevOptions, [index]: 'D' }))} />
                    <span className="ml-2">D</span>
                  </label>
                </div>
                <button className="mt-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-2 px-4 rounded-full shadow-md transform hover:scale-105 transition duration-300 ease-in-out" onClick={() => checkAnswer(question, index)}>Check Answer</button>
                <p className="text-gray-600 mt-2">{messages[index]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classroom;
