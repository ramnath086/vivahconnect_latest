// frontend/pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/services/api';

export default function Login() {
  const router  = useRouter();
  const [form,setForm] = useState({ email:'', password:'' });
  const [busy,setBusy] = useState(false);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);        // ✅ save
      router.push('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input name="email" type="email" placeholder="Email"
               className="w-full border p-2 rounded"
               value={form.email} onChange={change} required />
        <input name="password" type="password" placeholder="Password"
               className="w-full border p-2 rounded"
               value={form.password} onChange={change} required />
        <button disabled={busy}
          className="w-full bg-indigo-600 text-white py-2 rounded">
          {busy?'Logging in…':'Login'}
        </button>
      </form>
    </div>
  );
}
