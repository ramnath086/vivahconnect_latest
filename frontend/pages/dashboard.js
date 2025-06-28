// frontend/pages/dashboard.js
import { useEffect, useRef, useState } from 'react';
import api from '@/services/api';
import Navbar from '@/components/Navbar';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  // ────────────────────────────────────────────
  // Fetch logged-in user once on mount
  // ────────────────────────────────────────────
  useEffect(() => {
  api.get('/users/me')
    .then(res => {
      console.log("✅ User data:", res.data);
      setUser(res.data);
    })
    .catch(err => {
      console.error("❌ Error fetching user:", err);
    });
}, []);

  // ────────────────────────────────────────────
  // Upload selected photo → Cloudinary → save URL
  // ────────────────────────────────────────────
  async function uploadPhoto() {
    if (!fileRef.current?.files[0]) return;
    setUploading(true);

    try {
      // 1) send image to /api/upload
      const fd = new FormData();
      fd.append('photo', fileRef.current.files[0]);
      const { data } = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // 2) update this user’s photos array
      const updated = await api.put('/users/me', {
        $push: { photos: data.url },
      });

      setUser(updated.data);
      alert('Photo uploaded! ✅');
    } catch (err) {
      console.error(err);
      alert('Upload failed ❌');
    } finally {
      setUploading(false);
    }
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 space-y-4">
        <h1 className="text-3xl font-bold">Welcome, {user.firstName}</h1>

        {/* Existing details */}
        <p>Email: {user.email}</p>
        <p>Location: {user.location || '—'}</p>

        {/* Photo gallery */}
        <div className="flex gap-4 flex-wrap">
          {user.photos?.map((url) => (
            <img
              key={url}
              src={url}
              alt="profile"
              className="h-32 w-32 object-cover rounded-xl border"
            />
          ))}
        </div>

        {/* Hidden file input + Upload button */}
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          className="hidden"
          onChange={uploadPhoto}
        />
        <button
          onClick={() => fileRef.current.click()}
          disabled={uploading}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {uploading ? 'Uploading…' : 'Upload Photo'}
        </button>
      </div>
    </>
  );
}
