// components/ProfilePhotoUpload.js
import { useState } from 'react';
import api from '@/services/api';

export default function ProfilePhotoUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      onUpload(res.data.imageUrl);
    } catch (err) {
      console.error('❌ Upload failed', err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Upload Profile Photo</h2>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}
