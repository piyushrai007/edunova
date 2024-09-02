import axios from 'axios';

// Create a custom axios instance
const api = axios.create({
  baseURL: 'https://backend-nfkn.onrender.com/api',
  timeout: 5000,
});

// Function to send a keep-alive request
const keepServerAlive = async () => {
  try {
    await api.get('/keep-alive'); // Replace with an appropriate endpoint for your server
  } catch (error) {
    console.error('Error keeping server alive', error);
  }
};

// Set an interval to keep the server alive every 4 minutes
const KEEP_ALIVE_INTERVAL = 4 * 60 * 1000; // 4 minutes
setInterval(keepServerAlive, KEEP_ALIVE_INTERVAL);

// Add a response interceptor
api.interceptors.response.use(
  response => response, // Simply return the response if it was successful
  async error => {
    const originalRequest = error.config;

    // Check if the error was caused by an expired access token
    if (error.response.status === 401 && error.response.data.code === 'token_not_valid') {
      const refreshToken = localStorage.getItem('refreshToken');

      // Try to get a new access token using the refresh token
      try {
        const response = await api.post('token/refresh/', { refresh: refreshToken });

        // Update the access token in local storage
        localStorage.setItem('accessToken', response.data.access);

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
        return api(originalRequest);
      } catch (error) {
        console.error('Error refreshing token', error);
        // Handle token refresh errors e.g. redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

export default api;
