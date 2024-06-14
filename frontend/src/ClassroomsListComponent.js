// import React from 'react';

// const ClassroomsListComponent = ({ classrooms, backgroundImage, selectedOptions, setSelectedOptions, checkAnswer, messages }) => {
//   return (
//     <div>
//     <h2 className="text-3xl font-bold mb-4 text-indigo-700">Your Classrooms</h2>
//     {classrooms.map(classroom => (
//       <div key={classroom.id} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-8" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
//         <p className="font-bold text-xl mb-2 text-purple-700">ID: {classroom.id}</p>
//         <p className="mb-2 text-gray-700">Name: {classroom.name}</p>
//         <p className="mb-4 text-gray-700">Code: {classroom.code}</p>
//         <div>
//           <h3 className="text-2xl font-bold mb-2 text-green-700">Resources</h3>
//           {classroom.resources && classroom.resources.map(resource => (
//             <div key={resource.id} className="mb-2">
//               <a href={resource.file} download className="text-blue-500 hover:underline">{resource.name}</a>
//             </div>
//           ))}
//         </div>
//         <div>
//           <h3 className="text-2xl font-bold mb-2 text-yellow-700">Lectures</h3>
//           {classroom.lectures && classroom.lectures.map(lecture => (
//             <div key={lecture.id} className="mb-4">
//                 <div className="font-bold text-gray-800">Date: {lecture.date_time}</div>
//                 <div className="text-sm text-gray-600">Teacher's Note: {lecture.name}</div>
//                 <div className="text-sm text-gray-600"> {lecture.response.summary}</div>
//                 {lecture.response.questions.map((question, index) => (
//                   <div key={index} className="mb-4">
//                     <div className="text-gray-800">{question.text}</div>
//                     <div className="flex items-center mt-2">
//                       <label className="mr-4">
//                         <input type="radio" value="A" checked={selectedOptions[index] === 'A'} onChange={() => setSelectedOptions(prevOptions => ({ ...prevOptions, [index]: 'A' }))} />
//                         <span className="ml-2 text-gray-700">A</span>
//                       </label>
//                       <label className="mr-4">
//                         <input type="radio" value="B" checked={selectedOptions[index] === 'B'} onChange={() => setSelectedOptions(prevOptions => ({ ...prevOptions, [index]: 'B' }))} />
//                         <span className="ml-2 text-gray-700">B</span>
//                       </label>
//                       <label className="mr-4">
//                         <input type="radio" value="C" checked={selectedOptions[index] === 'C'} onChange={() => setSelectedOptions(prevOptions => ({ ...prevOptions, [index]: 'C' }))} />
//                         <span className="ml-2 text-gray-700">C</span>
//                       </label>
//                       <label>
//                         <input type="radio" value="D" checked={selectedOptions[index] === 'D'} onChange={() => setSelectedOptions(prevOptions => ({ ...prevOptions, [index]: 'D' }))} />
//                         <span className="ml-2 text-gray-700">D</span>
//                       </label>
//                     </div>
//                     <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-2 px-4 rounded-full shadow-md transform hover:scale-105 transition duration-300 ease-in-out" onClick={() => checkAnswer(question, index)}>Check Answer</button>
//                     <div className="text-gray-600">{messages[index]}</div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ClassroomsListComponent;
