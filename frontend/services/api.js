import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vivahconnect-latest-api.onrender.com/api',
  // ❌ Remove withCredentials (you’re using Bearer token, not cookies)
  // withCredentials: true
});

// ✅ Always attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log('[Interceptor] Token:', token); // 👀 Confirm token shows
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default api;
