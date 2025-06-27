// src/components/FilterSidebar.js
export default function FilterSidebar({ filters, setFilters }) {
  return (
    <aside className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Language</label>
        <input
          className="border rounded p-2 w-full"
          value={filters.language || ''}
          onChange={e => setFilters(f => ({ ...f, language: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Location</label>
        <input
          className="border rounded p-2 w-full"
          value={filters.location || ''}
          onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
        />
      </div>
    </aside>
  );
}
