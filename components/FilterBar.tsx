'use client'

export default function FilterBar() {
  return (
    <div className="flex gap-2 mb-8">
      <select className="px-3 py-1 border rounded bg-white text-sm">
        <option>All Platforms</option>
      </select>
      <select className="px-3 py-1 border rounded bg-white text-sm">
        <option>All Industries</option>
      </select>
      <select className="px-3 py-1 border rounded bg-white text-sm">
        <option>Most Recent</option>
      </select>
    </div>
  )
} 