import { Suspense } from 'react'
import HeadlineGrid from '@/components/HeadlineGrid'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import dbConnect from '@/lib/mongodb'
import Headline from '@/lib/models/Headline'

async function getHeadlines() {
  await dbConnect()
  const headlines = await Headline.find({}).sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(headlines))
}

export default async function Home() {
  const headlines = await getHeadlines()
  
  return (
    <main className="flex-1 py-8 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-[40px] font-bold leading-tight mb-4">
          The Best Advertising Headlines Collection,<br />
          Copy, Titles and More
        </h1>
        <p className="text-gray-600 mb-8">
          Discover and get inspired by the most compelling headlines across different platforms and industries.
        </p>
        
        <input
          type="text"
          placeholder="Search headlines..."
          className="w-full h-10 px-3 mb-4 border rounded"
        />

        <div className="flex gap-2 mb-8">
          <select className="h-8 px-2 border rounded">
            <option>All Platforms</option>
          </select>
          <select className="h-8 px-2 border rounded">
            <option>All Industries</option>
          </select>
          <select className="h-8 px-2 border rounded">
            <option>Most Recent</option>
          </select>
        </div>

        <Suspense fallback={<div>Loading headlines...</div>}>
          <HeadlineGrid headlines={headlines} />
        </Suspense>
      </div>
    </main>
  )
} 