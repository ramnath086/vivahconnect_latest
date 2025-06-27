// src/components/AdminTable.js
export default function AdminTable({ rows = [] }) {
  return (
    <table className="w-full text-left border">
      <thead className="bg-gray-100">
        <tr><th className="p-2">User</th><th>Email</th><th>Status</th></tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r._id} className="border-t">
            <td className="p-2">{r.firstName} {r.lastName}</td>
            <td className="p-2">{r.email}</td>
            <td className="p-2">{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
