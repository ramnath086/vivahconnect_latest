import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api'
});

api.interceptors.request.use(cfg => {
  const token = typeof window !== 'undefined' && localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
