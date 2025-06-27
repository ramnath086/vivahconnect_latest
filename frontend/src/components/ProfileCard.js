// src/components/ProfileCard.js
export default function ProfileCard({ user }) {
  return (
    <div className="border rounded-xl shadow p-4 hover:shadow-lg transition">
      <img
        src={user.photos?.[0] || '/avatar.png'}
        alt=""
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="mt-2 font-semibold">{user.firstName} {user.lastName}</h3>
      <p className="text-sm text-gray-500">{user.location} · {user.language}</p>
    </div>
  );
}
