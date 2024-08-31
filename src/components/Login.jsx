import React, { useState } from 'react';
// import axios from 'axios';
import api from "./api/api";
import { useNavigate } from 'react-router-dom';
import student4Image from '../../public/student4.png';

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await api.post('login/', {
                username,
                password
            });

            if (response.status === 200) {
                console.log('Login successful!', response.data);
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('user_type', response.data.user_type);
                localStorage.setItem('username', username); // store username
                localStorage.setItem('userId', response.data.user_id); // store user ID
                navigate(`/${response.data.user_type}-dashboard`);
            } else {
                setErrorMessage('Bad request. Please check your username and password.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="font-[sans-serif] bg-gray-900 md:h-screen">
            <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                <div className="max-md:order-1 p-4">
                    <img src="https://readymadeui.com/signin-image.webp" className="lg:max-w-[80%] w-full h-full object-contain block mx-auto" alt="login-image" />
                </div>

                <div className="flex items-center md:p-8 p-6 bg-white md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
                    <form className="max-w-lg w-full mx-auto" onSubmit={handleLogin}>
                        <div className="mb-12">
                            <h3 className="text-gray-800 text-4xl font-extrabold">Sign in</h3>
                            <p className="text-gray-800 text-sm mt-4 ">Don't have an account <a href="/signup" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
                        </div>

                        <div>
                            <label className="text-gray-800 text-xs block mb-2">Username</label>
                            <div className="relative flex items-center">
                                <input name="username" type="text" required className="w-full text-sm border-b border-gray-300 focus:border-gray-800 px-2 py-3 outline-none" placeholder="Enter username" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                                    <defs>
                                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                            <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                        </clipPath>
                                    </defs>
                                    <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                        <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div className="mt-8">
                            <label className="text-gray-800 text-xs block mb-2">Password</label>
                            <div className="relative flex items-center">
                                <input name="password" type="password" required className="w-full text-sm border-b border-gray-300 focus:border-gray-800 px-2 py-3 outline-none" placeholder="Enter password" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <a href="jajvascript:void(0);" className="text-blue-600 font-semibold text-sm hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        <div className="mt-12">
                            <button type="submit" className="w-full py-3 px-6 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none">
                                Sign in
                            </button>
                        </div>

                        <div className="my-6 flex items-center gap-4">
                            <hr className="w-full border-gray-300" />
                            <p className="text-sm text-gray-800 text-center">or</p>
                            <hr className="w-full border-gray-300" />
                        </div>

                        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;