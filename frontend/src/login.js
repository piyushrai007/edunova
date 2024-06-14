import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { WavyBackground } from "./ui/wavy-background";
function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const backgroundImage = `${process.env.PUBLIC_URL}/animated.gif`; // replace with the path to your image

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post('https://075dhm4s-8000.inc1.devtunnels.ms/api/login/', {
        username,
        password
      });

      if (response.status === 200) {
        console.log('Login successful!', response.data);
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('user_type', response.data.user_type);
        localStorage.setItem('username', username); // store username
        localStorage.setItem('userId', response.data.user_id); // store user ID// store user ID
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
    <div>
    <Header/>
    <WavyBackground className="min-h-screen flex items-center justify-center py-50 px-4 sm:px-10 lg:px-10">
        <div className="max-w-md w-full flex space-x-5 bg-gray-700 p-10 rounded-lg shadow-xl ml-2">
        <div className="w-3/3">
          <img src={process.env.PUBLIC_URL + 'student4.png'} alt="Your Image" className="h-48 w-48 mx-auto mb-4" />
        </div>
        <div className="w-2/3 flex flex-col">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <form onSubmit={handleLogin} className="space-y-4 flex-grow">
            <label className="block">
              <span className="text-gray-200">Username:</span>
              <input name="username" type="text" placeholder="Username" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </label>
            <label className="block">
              <span className="text-gray-200">Password:</span>
              <input name="password" type="password" placeholder="Password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </label>
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 animate-pulse">Login</button>
          </form>
          <p className="mt-4 text-white">
            Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-700">Register</a>
          </p>
        </div>
      </div>
    </WavyBackground>
    <Footer />
    </div>
  );
}

export default Login;