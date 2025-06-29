import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/services/api';

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token); // ✅ save token
      router.push('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {['firstName','lastName','email','password'].map((field, idx) => (
          <input
            key={idx}
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            placeholder={field.replace(/([A-Z])/g,' $1')}
            className="w-full border p-2 rounded"
            value={form[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Creating…' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
