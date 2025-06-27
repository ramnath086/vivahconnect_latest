import { useEffect, useState } from 'react';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import ProfileCard from '@/components/ProfileCard';
import FilterSidebar from '@/components/FilterSidebar';

export default function Profiles() {
  const [filters, setFilters] = useState({});
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/users'); // implement in backend
      setProfiles(data);
    })();
  }, []);

  return (
    <>
      <Navbar/>
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6 mt-6">
        <FilterSidebar filters={filters} setFilters={setFilters}/>
        <div className="col-span-3 grid grid-cols-3 gap-4">
          {profiles.map(u => <ProfileCard key={u._id} user={u}/>)}
        </div>
      </div>
    </>
  );
}
