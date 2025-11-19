import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: SERVER_URL, // your backend URL
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token') || "NONE"; // get JWT from SessionStorage
    if (token) {
      config.headers['x-auth-token'] = token; // attach token to every request
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
