import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatWindow from '@/components/ChatWindow';

export default function Chat() {
  const router = useRouter();
  const [room, setRoom] = useState('');

  if (!router.isReady) return null;

  return (
    <>
      <Navbar/>
      <main className="max-w-4xl mx-auto mt-6 h-[70vh] border rounded-xl">
        {!room ? (
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Enter Room ID</h2>
            <input className="border rounded p-2 w-full" value={room} onChange={e => setRoom(e.target.value)}/>
          </div>
        ) : <ChatWindow room={room}/>}
      </main>
    </>
  );
}
