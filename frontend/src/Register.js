import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiBook } from 'react-icons/fi';
import Header from './Header';
import Footer from './Footer';
import './index.css';
import videoFile from './142452-779996481.mp4';
import { Link } from 'react-router-dom';


function Registration() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [enrollment, setEnrollment] = useState('');
    const [branch, setBranch] = useState('');
    const [photo, setPhoto] = useState(null);
    const [department, setDepartment] = useState('');
    const [isTeacher, setIsTeacher] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('user.username', username);
        formData.append('user.password', password);
        formData.append('user.email', email);
        formData.append('user.first_name', firstName);
        formData.append('user.last_name', lastName);
        if (isTeacher) {
            formData.append('department', department);
        } else {
            formData.append('enrollment', enrollment);
            formData.append('branch', branch);
            if (photo) {
                formData.append('photo', photo);
            }
        }

        try {
            const response = await axios.post(`https://075dhm4s-8000.inc1.devtunnels.ms/api/${isTeacher ? 'teachers' : 'students'}/`, formData);
            setSuccessMessage('Registration successful!');
            navigate("/login");
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data);
                alert(JSON.stringify(error.response.data));
            } else {
                console.log('Error', error.message);
            }
        }
    };

    const checkUsernameAvailability = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/check_username/${username}`);
            setUsernameAvailable(response.data.available);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
    <header className={`main-header clearfix`}>
        <div className="logo">
            <Link to="/"><em>SMART</em> LEARN</Link>
        </div>
    </header>

    <div className="bg-black h-20"></div>

    <div className="h-full bg-gray-400 dark:bg-gray-900 flex flex-col lg:flex-row">
        <div className="flex w-full lg:w-1/2 h-64 lg:h-auto">
            {/* Left part for the video */}
            <div className="w-full  h-full">
                <video 
                    className="w-full h-full object-cover"
                    autoPlay loop muted>
                    <source src={videoFile} type="video/mp4" />
                </video>
            </div>
        </div>

        <div className="w-full lg:w-1/2 h-auto lg:h-full flex justify-center items-center">
            <div className="w-full object-cover bg-white dark:bg-gray-700 rounded-lg">
                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center justify-center w-full">
                        <FiBook
                            className={`cursor-pointer mr-2 text-3xl ${isTeacher ? 'text-blue-500' : 'text-gray-400'}`}
                            onClick={() => setIsTeacher(true)}
                        />
                        <FiUser
                            className={`cursor-pointer text-3xl ${isTeacher ? 'text-gray-400' : 'text-blue-500'}`}
                            onClick={() => setIsTeacher(false)}
                        />
                    </div>
                    <p className="text-gray-800 dark:text-white">Register as a {isTeacher ? 'Teacher' : 'Student'}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col lg:flex-row justify-between">
                        <div className="w-full lg:w-1/2 pr-0 lg:pr-2 mb-4 lg:mb-0">
                            <label className="block text-sm font-bold text-gray-700 dark:text-white" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                            />
                            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
                        </div>
                        <div className="w-full lg:w-1/2 pl-0 lg:pl-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-white" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow focus:outline-none focus:shadow-outline"
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                            />
                            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-white" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                checkUsernameAvailability(e.target.value);
                            }}
                            placeholder="Username"
                        />
                        {!usernameAvailable && <p className="text-red-500">Username is taken</p>}
                        {errors.username && <p className="text-red-500">{errors.username}</p>}
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between">
                        <div className="w-full lg:w-1/2 pr-0 lg:pr-2 mb-4 lg:mb-0">
                            <label className="block text-sm font-bold text-gray-700 dark:text-white" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border border-red-500 rounded shadow focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="******************"
                            />
                            <p className="text-xs italic text-red-500">Please choose a password.</p>
                            {errors.password && <p className="text-red-500">{errors.password}</p>}
                        </div>
                        <div className="w-full lg:w-1/2 pl-0 lg:pl-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-white" htmlFor="c_password">
                                Confirm Password
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow focus:outline-none focus:shadow-outline"
                                id="c_password"
                                type="password"
                                placeholder="******************"
                            />
                        </div>
                    </div>
                    {isTeacher ? (
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-white">
                                Department
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow focus:outline-none focus:shadow-outline"
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                placeholder="Department"
                            />
                            {errors.department && <p className="text-red-500">{errors.department}</p>}
                        </div>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-white">
                                    Enrollment
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={enrollment}
                                    onChange={(e) => setEnrollment(e.target.value)}
                                    placeholder="Enrollment"
                                />
                                {errors.enrollment && <p className="text-red-500">{errors.enrollment}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-white">
                                    Branch
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    placeholder="Branch"
                                />
                                {errors.branch && <p className="text-red-500">{errors.branch}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-white">
                                    Photo
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow focus:outline-none focus:shadow-outline"
                                    type="file"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                />
                                {errors.photo && <p className="text-red-500">{errors.photo}</p>}
                            </div>
                        </>
                    )}
                    <div className="text-center">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Register Account
                        </button>
                    </div>
                    <hr className="my-6 border-t" />
                    <div className="text-center">
                        <a className="inline-block text-sm text-blue-500 dark:text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                    <div className="text-center">
                        <a className="inline-block text-sm text-blue-500 dark:text-blue-500 hover:text-blue-800" href="/login">
                            Already have an account? Login!
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <Footer />
</div>

    );
}

export default Registration;
