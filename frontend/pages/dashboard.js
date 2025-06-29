import { useEffect, useState } from 'react';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import ProfilePhotoUpload from '@/components/ProfilePhotoUpload';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/me').then(res => setUser(res.data));
  }, []);

  const handleUpload = async (url) => {
    await api.put('/users/me', { profileImage: url });
    setUser(u => ({ ...u, profileImage: url }));
  };

  if (!user) return null;
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 space-y-4">
        <h1 className="text-3xl font-bold">Welcome, {user.firstName}</h1>
        <p>Email: {user.email}</p>
        {user.profileImage && (
          <img src={user.profileImage} alt="Profile" className="w-40 h-40 object-cover rounded-xl" />
        )}

        {/* Photo uploader */}
        <ProfilePhotoUpload onUpload={handleUpload} />
      </div>
    </>
  );
}
