// src/components/ChatWindow.js
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

export default function ChatWindow({ room }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_API?.replace('/api', '') || '');
    socketRef.current.emit('joinRoom', room);
    socketRef.current.on('message', m => setMessages(prev => [...prev, m]));
    return () => socketRef.current.disconnect();
  }, [room]);

  const send = () => {
    if (!input.trim()) return;
    socketRef.current.emit('chatMessage', { room, message: input });
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 p-4">
        {messages.map((m, i) => (
          <div key={i} className="bg-indigo-50 rounded p-2">{m}</div>
        ))}
      </div>
      <div className="p-4 flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={send} className="bg-indigo-600 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
