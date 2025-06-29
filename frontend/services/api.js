// frontend/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vivahconnect-latest-api.onrender.com/api',
  withCredentials: true    // keep this true for CORS + cookies
});

// ───────── attach token automatically ─────────
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
