import { useEffect, useState } from 'react';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import AdminTable from '@/components/AdminTable';

export default function Admin() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/stats').then(res => setStats(res.data));
  }, []);

  if (!stats) return null;
  return (
    <>
      <Navbar/>
      <div className="max-w-4xl mx-auto mt-8 space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Total users: {stats.users}</p>
        <p>Matches made: {stats.matches}</p>
        {/* You could add AdminTable here */}
      </div>
    </>
  );
}
