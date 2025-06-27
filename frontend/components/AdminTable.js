export default function AdminTable({ rows }) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr><th>User</th><th>Email</th><th>Status</th></tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r._id}>
            <td>{r.firstName} {r.lastName}</td>
            <td>{r.email}</td>
            <td>{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
