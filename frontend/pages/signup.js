import { useState } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/router';

export default function Signup() {
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', password:'' });
  const router = useRouter();

  const submit = async e => {
    e.preventDefault();
    const { data } = await api.post('/auth/register', form);
    localStorage.setItem('token', data.token);
    router.push('/dashboard');
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <form className="border rounded-xl p-8 w-96 space-y-4" onSubmit={submit}>
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {['firstName','lastName','email','password'].map(k => (
          <input key={k} className="border p-2 w-full rounded" type={k==='password'?'password':'text'} placeholder={k.charAt(0).toUpperCase()+k.slice(1)} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}/>
        ))}
        <button className="bg-indigo-600 text-white w-full py-2 rounded" type="submit">Create Account</button>
      </form>
    </main>
  );
}
