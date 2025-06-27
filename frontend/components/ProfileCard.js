export default function ProfileCard({ user }) {
  return (
    <div className="border rounded-2xl shadow p-4 hover:shadow-lg transition">
      <img src={user.photos?.[0] || '/avatar.png'} alt="" className="w-full h-48 object-cover rounded-xl" />
      <h3 className="mt-2 text-lg font-semibold">{user.firstName} {user.lastName}</h3>
      <p className="text-sm text-gray-500">{user.location} • {user.language}</p>
    </div>
  );
}
