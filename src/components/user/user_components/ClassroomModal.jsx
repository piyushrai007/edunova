import React from 'react';
import Modal from 'react-modal';

function ClassroomModal({ isOpen, onRequestClose, classroomCode, setClassroomCode, joinClassroom }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Join Classroom"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '200px',
          padding: '20px',
          borderRadius: '10px'
        }
      }}
    >
      <h2 className="text-xl font-bold mb-4">Enter Classroom Code</h2>
      <input
        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-gray-200 focus:bg-gray-100"
        type="text"
        value={classroomCode}
        onChange={e => setClassroomCode(e.target.value)}
        placeholder="Classroom Code"
      />
      <button
        className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-yellow-500 hover:to-green-500 text-white font-bold py-3 px-6 rounded-full w-full shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
        onClick={joinClassroom}
      >
        Join
      </button>
    </Modal>
  );
}

export default ClassroomModal;
