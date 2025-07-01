import { useEffect, useState } from 'react';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import ProfilePhotoUpload from '@/components/ProfilePhotoUpload';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/users/me');
        console.log('✅ /users/me response →', res.status, res.data);
        setUser(res.data);
      } catch (err) {
        console.error('❌ /users/me error →', err.response?.status, err.response?.data || err.message);
        alert(`/users/me failed: ${err.response?.status}`);
      }
    })();
  }, []);

  const handleUpload = async (url) => {
    await api.put('/users/me', { profileImage: url });
    setUser(u => ({ ...u, profileImage: url }));
  };

  if (!user) return (
    <div className="text-center mt-10 text-gray-500">
      Loading user data...
    </div>
  );

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

        {/* Debugging info */}
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </>
  );
}
