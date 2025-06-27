// src/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">
        <Link href="/">VivahConnect</Link>
      </h1>
      <div className="space-x-4">
        <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        <Link href="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
      </div>
    </nav>
  );
}
