// frontend/services/api.js
import axios from 'axios';

// ONE axios instance for your whole app
const api = axios.create({
  baseURL: 'https://vivahconnect-latest-api.onrender.com/api',
  withCredentials: false          // ✅ Bearer‑token flow → NO cookies
});

// Attach JWT automatically
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');      // saved after login
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
