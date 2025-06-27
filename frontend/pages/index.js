import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar/>
      <section className="max-w-4xl mx-auto text-center mt-20 space-y-6">
        <h1 className="text-4xl font-extrabold">Find Your Perfect Match</h1>
        <p className="text-lg text-gray-600">Join thousands of singles using VivahConnect.</p>
        <div className="space-x-4">
          <Link href="/signup" className="bg-indigo-600 text-white px-6 py-3 rounded-full">Get Started</Link>
          <Link href="/login" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full">Sign In</Link>
        </div>
      </section>
    </>
  );
}
