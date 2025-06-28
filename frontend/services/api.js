import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vivahconnect-latest-api.onrender.com/api',
  withCredentials: true
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
