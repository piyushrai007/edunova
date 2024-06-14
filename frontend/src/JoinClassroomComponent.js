import React, { useState } from 'react';

const JoinClassroomComponent = ({ joinClassroom, setClassroomCode: setCode }) => {
  const [classroomCode, setClassroomCode] = useState('');

  return (
    <div className="mb-8">
      <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 bg-gray-200 focus:bg-gray-100" type="text" value={classroomCode} onChange={e => setClassroomCode(e.target.value)} placeholder="Enter Classroom Code" />
      <button className="bg-gradient-to-r from-yellow-400 to-green-500 hover:from-green-500 hover:to-yellow-400 text-white font-bold py-3 px-6 rounded-full w-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" onClick={joinClassroom}>Join Classroom</button>
    </div>
  );
};

export default JoinClassroomComponent;
