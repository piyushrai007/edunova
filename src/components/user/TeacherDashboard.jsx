import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Loading from './Loading';
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
  Snackbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './TeacherDashboard.css';

function TeacherDashboard() {
  const [user, setUser] = useState(null);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [classroomName, setClassroomName] = useState('');
  const [resourceNames, setResourceNames] = useState({});
  const [file, setFile] = useState(null);
  const [lectureFile, setLectureFile] = useState(null);
  const [lectureNotes, setLectureNotes] = useState({});
  const [theme, setTheme] = useState('light');
  const [flaskResponse, setFlaskResponse] = useState(null); // Flask response state
  const [isLoading, setIsLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [attendanceImage, setAttendanceImage] = useState(null);
  const [identifiedStudents, setIdentifiedStudents] = useState([]);
  const [isUploadingResource, setIsUploadingResource] = useState(false);
  const [isUploadingLecture, setIsUploadingLecture] = useState(false);
  const [isUploadingAttendanceImage, setIsUploadingAttendanceImage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar for success messages

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
            Authorization: `Bearer ${token}`,
          },
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
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const classroomsWithStudents = await Promise.all(
          response.data.map(async (classroom) => {
            const studentsResponse = await api.get(`classrooms/${classroom.id}/students/`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            });
            return { ...classroom, students: studentsResponse.data };
          })
        );
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
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!teacherResponse.data || teacherResponse.data.length === 0) {
        console.error('No teacher found for this user');
        return;
      }
      const teacherId = teacherResponse.data[0].id;
      const response = await api.post(
        'classrooms/',
        {
          name: classroomName,
          teacher: teacherId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setClassrooms((prevClassrooms) => [...prevClassrooms, response.data]);
      setClassroomName('');
      setSnackbarOpen(true); // Show snackbar on success
    } catch (error) {
      console.error('Error creating classroom', error);
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); // Close snackbar
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
          <Button onClick={logout} variant="contained" color="secondary">
            Logout
          </Button>
        </div>
      </header>

      <div className="wrapper">
        <aside className="sidebar">
          <Typography variant="h6" gutterBottom>
            Classrooms
          </Typography>
          <div className="create-classroom">
            <TextField
              type="text"
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
              placeholder="Classroom name"
              variant="outlined"
              fullWidth
              size="small"
            />
            <Button onClick={createClassroom} variant="contained" color="primary">
              Create Classroom
            </Button>
          </div>
          <div className="classroom-list">
            {classrooms.map((classroom) => (
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
                <Typography variant="h5" gutterBottom>
                  {selectedClassroom.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Students
                </Typography>
                <div className="students-list">
                  <Grid container spacing={2}>
                    {selectedClassroom.students.map((student) => (
                      <Grid item xs={12} sm={6} md={4} key={student.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="body1">
                              <strong>Name:</strong> {student.name}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Enrollment:</strong> {student.enrollment}
                            </Typography>
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
                    <Typography variant="h6" gutterBottom>
                      Upload Resources
                    </Typography>
                    <TextField
                      type="text"
                      value={resourceNames[selectedClassroom.id] || ''}
                      onChange={(e) =>
                        setResourceNames((prev) => ({
                          ...prev,
                          [selectedClassroom.id]: e.target.value,
                        }))
                      }
                      placeholder="Resource name"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                    <input type="file" onChange={handleFileChange} />
                    <Button
                      onClick={async () => {
                        setIsUploadingResource(true);
                        try {
                          // Call your upload resource API here
                        } finally {
                          setIsUploadingResource(false);
                        }
                      }}
                      variant="contained"
                      color="primary"
                      disabled={isUploadingResource}
                    >
                      {isUploadingResource ? <CircularProgress size={24} /> : 'Upload Resource'}
                    </Button>
                  </div>
                )}

                {tabIndex === 1 && (
                  <div className="upload-section">
                    <Typography variant="h6" gutterBottom>
                      Upload Lecture Notes
                    </Typography>
                    <TextField
                      type="text"
                      value={lectureNotes[selectedClassroom.id] || ''}
                      onChange={(e) =>
                        setLectureNotes((prev) => ({
                          ...prev,
                          [selectedClassroom.id]: e.target.value,
                        }))
                      }
                      placeholder="Lecture title"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                    <input type="file" onChange={handleLectureFileChange} />
                    <Button
                      onClick={async () => {
                        setIsUploadingLecture(true);
                        try {
                          // Call your upload lecture API here
                        } finally {
                          setIsUploadingLecture(false);
                        }
                      }}
                      variant="contained"
                      color="primary"
                      disabled={isUploadingLecture}
                    >
                      {isUploadingLecture ? <CircularProgress size={24} /> : 'Upload Lecture'}
                    </Button>
                  </div>
                )}

                {tabIndex === 2 && (
                  <div className="attendance-section">
                    <Typography variant="h6" gutterBottom>
                      Upload Attendance Image
                    </Typography>
                    <input type="file" onChange={handleAttendanceFileChange} />
                    <Button
                      onClick={async () => {
                        setIsUploadingAttendanceImage(true);
                        try {
                          // Call your attendance image upload API here
                        } finally {
                          setIsUploadingAttendanceImage(false);
                        }
                      }}
                      variant="contained"
                      color="primary"
                      disabled={isUploadingAttendanceImage}
                    >
                      {isUploadingAttendanceImage ? (
                        <CircularProgress size={24} />
                      ) : (
                        'Upload Attendance'
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Classroom created successfully!"
      />
    </div>
  );
}

export default TeacherDashboard;
