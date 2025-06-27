import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">VivahConnect</Link>
        <div className="space-x-4">
          <Link href="/profiles">Profiles</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
