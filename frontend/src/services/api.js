import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vivahconnect-latest-api.onrender.com/api',
});

// Attach token and log what goes out
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  console.log('[Axios] token in localStorage →', token);   // 🟢 1
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  console.log('[Axios] final headers →', cfg.headers);      // 🟢 2
  return cfg;
});

export default api;
