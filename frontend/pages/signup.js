// frontend/pages/signup.js
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
  const [busy, setBusy] = useState(false);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token);        // ✅ save
      router.push('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <form onSubmit={submit} className="space-y-3">
        {['firstName','lastName','email','password'].map((k,i)=>(
          <input key={i} name={k} type={k==='password'?'password':'text'}
                 placeholder={k.replace(/([A-Z])/g,' $1')}
                 className="w-full border p-2 rounded"
                 value={form[k]} onChange={change} required />
        ))}
        <button disabled={busy}
          className="w-full bg-indigo-600 text-white py-2 rounded">
          {busy?'Creating…':'Create Account'}
        </button>
      </form>
    </div>
  );
}
