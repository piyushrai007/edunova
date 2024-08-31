import axios from 'axios';

// Create a custom axios instance
const api = axios.create({
  baseURL: 'https://075dhm4s-8000.inc1.devtunnels.ms/api/',
  timeout: 5000,
});

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