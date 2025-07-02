// frontend/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vivahconnect-latest-api.onrender.com/api',
  withCredentials: false          // ← only false here
});

// make sure NO global default remains
axios.defaults.withCredentials = false;

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
