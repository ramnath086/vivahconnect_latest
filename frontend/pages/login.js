import { useState } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = async e => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    router.push('/dashboard');
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <form className="border rounded-xl p-8 w-80 space-y-4" onSubmit={submit}>
        <h2 className="text-2xl font-bold text-center">Log In</h2>
        <input className="border p-2 w-full rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" className="border p-2 w-full rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button className="bg-indigo-600 text-white w-full py-2 rounded" type="submit">Login</button>
      </form>
    </main>
  );
}
