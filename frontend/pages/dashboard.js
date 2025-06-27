import { useEffect, useState } from 'react';
import api from '@/services/api';
import Navbar from '@/components/Navbar';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/me').then(res => setUser(res.data));
  }, []);

  if (!user) return null;
  return (
    <>
      <Navbar/>
      <div className="max-w-4xl mx-auto mt-8 space-y-4">
        <h1 className="text-3xl font-bold">Welcome, {user.firstName}</h1>
        <p>Email: {user.email}</p>
        <p>Location: {user.location || '—'}</p>
      </div>
    </>
  );
}
