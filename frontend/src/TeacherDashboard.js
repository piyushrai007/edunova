import React, { useEffect, useState } from 'react';
import api from './api';
import Loading from './loading.js';
import {
  Avatar,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './TeacherDashboard.css';

function TeacherDashboard() {
  const [user, setUser] = useState(null);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [classroomName, setClassroomName] = useState('');
  const [resourceNames, setResourceNames] = useState({});
  const [lectureNames, setLectureNames] = useState({});
  const [file, setFile] = useState(null);
  const [lectureFile, setLectureFile] = useState(null);
  const [lectureNotes, setLectureNotes] = useState({});
  const [theme, setTheme] = useState('light');
  const [flaskResponse, setFlaskResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [attendanceImage, setAttendanceImage] = useState(null);
  const [identifiedStudents, setIdentifiedStudents] = useState([]);
  const [isUploadingResource, setIsUploadingResource] = useState(false);
  const [isUploadingLecture, setIsUploadingLecture] = useState(false);
  const [isUploadingAttendanceImage, setIsUploadingAttendanceImage] = useState(false);

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
      } catch (error) {
        console.error('Error fetching user', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await api.get(`classrooms/?teacher__user__username=${user.user.username}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const classroomsWithStudents = await Promise.all(response.data.map(async classroom => {
          const studentsResponse = await api.get(`classrooms/${classroom.id}/students/`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          return { ...classroom, students: studentsResponse.data };
        }));
        setClassrooms(classroomsWithStudents);
      } catch (error) {
        console.error('Error fetching classrooms', error);
      }
    };

    if (user) {
      fetchClassrooms();
    }
  }, [user]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLectureFileChange = (e) => {
    setLectureFile(e.target.files[0]);
  };

  const handleAttendanceFileChange = (e) => {
    setAttendanceImage(e.target.files[0]);
  };

  const createClassroom = async () => {
    try {
      const teacherResponse = await api.get(`teachers/?user__username=${user.user.username}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (!teacherResponse.data || teacherResponse.data.length === 0) {
        console.error('No teacher found for this user');
        return;
      }
      const teacherId = teacherResponse.data[0].id;
      const response = await api.post('classrooms/', {
        name: classroomName,
        teacher: teacherId,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log('Classroom created', response.data);
      setClassrooms(prevClassrooms => [...prevClassrooms, response.data]);
      setClassroomName('');
    } catch (error) {
      console.error('Error creating classroom', error);
      if (error.response && error.response.data) {
        console.error('Server response:', error.response.data);
      }
    }
  };

  const uploadResource = async (id) => {
    try {
      setIsUploadingResource(true);
      const formData = new FormData();
      formData.append('name', resourceNames[id]);
      formData.append('file', file);
      formData.append('classroom', selectedClassroom.id);

      const response = await api.post('resources/', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Resource uploaded', response.data);
    } catch (error) {
      console.error('Error uploading resource', error);
    } finally {
      setIsUploadingResource(false);
    }
  };

  const uploadLecture = async (id) => {
    try {
      if (!lectureFile || lectureFile.type !== 'video/mp4') {
        console.error('Please select a MP4 file');
        return;
      }

      setIsUploadingLecture(true);
      const formData = new FormData();
      formData.append('video', lectureFile);

      // Send the video to the Flask API
      const flaskResponse = await fetch('http://127.0.0.1:5000/generate-questions', {
        method: 'POST',
        body: formData,
      });
      const flaskData = await flaskResponse.json();
      
      // Store the Flask API response in the state
      setFlaskResponse(JSON.stringify(flaskData));
      console.log('Flask response:', flaskResponse);
    } catch (error) {
      console.error('Error uploading lecture', error);
    } finally {
      setIsUploadingLecture(false);
    }
  };

  const uploadAttendanceImage = async () => {
    try {
      setIsUploadingAttendanceImage(true);
      const formData = new FormData();
      formData.append('image', attendanceImage);

      const flaskResponse = await fetch('http://127.0.0.1:5000/identify-students', {
        method: 'POST',
        body: formData,
      });
      const flaskData = await flaskResponse.json();

      if (flaskData.recognized_faces) {
        setIdentifiedStudents(flaskData.recognized_faces);
      }
    } catch (error) {
      console.error('Error uploading attendance image', error);
    } finally {
      setIsUploadingAttendanceImage(false);
    }
  };

  const confirmAttendance = async () => {
    try {
      const response = await api.post('attendances/', {
        students: identifiedStudents,
        classroom: selectedClassroom.id,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log('Attendance confirmed', response.data);
    } catch (error) {
      console.error('Error confirming attendance', error);
    }
  };

  const handleEditStudentName = (index, newName) => {
    const updatedStudents = [...identifiedStudents];
    updatedStudents[index].Name = newName;
    setIdentifiedStudents(updatedStudents);
  };

  const confirmUpload = async (id) => {
    try {
      const djangoResponse = await api.post('lectures/', {
        name: lectureNotes[id],
        response: JSON.parse(flaskResponse), // Send the parsed JSON response from Flask
        classroom: selectedClassroom.id,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log('Lecture uploaded', djangoResponse.data);
    } catch (error) {
      console.error('Error uploading lecture', error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`dashboard ${theme}`}>
      <header className="header">
        <div className="header-left">
          <Avatar className="avatar" src="/user-avatar.png" alt="User Avatar" />
          <div className="user-info">
            <Typography variant="h4">Welcome {user.user.username}</Typography>
            <Typography variant="body1">Email: {user.user.email}</Typography>
            <Typography variant="body1">Department: {user.department}</Typography>
          </div>
        </div>
        <div className="header-right">
          <Tooltip title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
            <Button onClick={toggleTheme} variant="contained" color="primary">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
          </Tooltip>
          <Button onClick={logout} variant="contained" color="secondary">Logout</Button>
        </div>
      </header>
      <div className="wrapper">
        <aside className="sidebar">
          <Typography variant="h6" gutterBottom>Classrooms</Typography>
          <div className="create-classroom">
            <TextField
              type="text"
              value={classroomName}
              onChange={e => setClassroomName(e.target.value)}
              placeholder="Classroom name"
              variant="outlined"
              fullWidth
              size="small"
            />
            <Button onClick={createClassroom} variant="contained" color="primary">Create Classroom</Button>
          </div>
          <div className="classroom-list">
            {classrooms.map(classroom => (
              <Accordion key={classroom.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  onClick={() => setSelectedClassroom(classroom)}
                >
                  <Typography variant="body1">{classroom.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    {classroom.students.length} students
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </aside>
        <main className="main">
          <div className="classroom-details">
            {selectedClassroom && (
              <>
                <Typography variant="h5" gutterBottom>{selectedClassroom.name}</Typography>
                <Typography variant="subtitle1" gutterBottom>Students</Typography>
                <div className="students-list">
                  <Grid container spacing={2}>
                    {selectedClassroom.students.map(student => (
                      <Grid item xs={12} sm={6} md={4} key={student.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="body1"><strong>Name:</strong> {student.name}</Typography>
                            <Typography variant="body2"><strong>Enrollment:</strong> {student.enrollment}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </div>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                  <Tab label="Resources" />
                  <Tab label="Lectures" />
                  <Tab label="Attendance" />
                </Tabs>
                {tabIndex === 0 && (
                  <div className="upload-section">
                    <TextField
                      type="text"
                      value={resourceNames[selectedClassroom.id] || ''}
                      onChange={e => setResourceNames(prevState => ({ ...prevState, [selectedClassroom.id]: e.target.value }))}
                      placeholder="Resource name"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                    <input type="file" onChange={handleFileChange} />
                    <Button onClick={() => uploadResource(selectedClassroom.id)} variant="contained" color="primary">
                      {isUploadingResource ? <CircularProgress size={24} /> : 'Upload Resource'}
                    </Button>
                  </div>
                )}
                {tabIndex === 1 && (
                  <div className="upload-section">
                    <input type="file" accept=".mp4" onChange={handleLectureFileChange} />
                    <TextField
                      type="text"
                      value={lectureNotes[selectedClassroom.id] || ''}
                      onChange={e => setLectureNotes(prevState => ({ ...prevState, [selectedClassroom.id]: e.target.value }))}
                      placeholder="Enter your note here"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                    <Button onClick={() => uploadLecture(selectedClassroom.id)} variant="contained" color="primary">
  {isUploadingLecture ? <CircularProgress size={24} /> : 'Upload Lecture'}
</Button>
{flaskResponse && (
  <div className="flask-response">
    <Typography variant="subtitle1">Generated Questions:</Typography>
    {flaskResponse.questions && flaskResponse.questions.map((question, index) => (
      <Typography key={index} variant="body2">{question}</Typography>
    ))}
    <Typography variant="subtitle1">Summary:</Typography>
    <Typography variant="body2">{flaskResponse.summary}</Typography>

    <Button onClick={() => confirmUpload(selectedClassroom.id)} variant="contained" color="secondary">
      Confirm and Send to Django
    </Button>
  </div>
)}

                  </div>
                )}
                {tabIndex === 2 && (
                  <div className="upload-section">
                    <input type="file" accept="image/*" onChange={handleAttendanceFileChange} />
                    <Button onClick={uploadAttendanceImage} variant="contained" color="primary">
                      {isUploadingAttendanceImage ? <CircularProgress size={24} /> : 'Upload Attendance Image'}
                    </Button>
                    <div className="identified-students">
                      <Typography variant="subtitle1" gutterBottom>Identified Students</Typography>
                      {identifiedStudents.length > 0 ? (
                        identifiedStudents.map((student, index) => (
                          <div key={index} className="identified-student">
                            <TextField
                              type="text"
                              value={student.Name}
                              onChange={(e) => handleEditStudentName(index, e.target.value)}
                              variant="outlined"
                              fullWidth
                              size="small"
                            />
                            <Typography variant="body2">
                              <strong>Recognized at:</strong> {student.Time}
                            </Typography>
                          </div>
                        ))
                      ) : (
                        <Typography variant="body2">No students identified yet.</Typography>
                      )}
                      <Button onClick={confirmAttendance} variant="contained" color="secondary">Confirm Attendance</Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
      <footer className="footer">
        <Typography variant="body1">© 2024 Your School. All rights reserved.</Typography>
      </footer>
    </div>
  );
}

export default TeacherDashboard;
