'use client';

export default function Navigation() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 flex items-center h-14">
        <a href="/" className="text-xl font-bold tracking-tight">1000Headlines</a>
        <div className="flex items-center space-x-6 ml-8">
          <a href="/inspiration" className="hover:underline">Inspiration</a>
          <a href="/categories" className="hover:underline">Categories</a>
          <a href="/templates" className="hover:underline">Templates</a>
          <a href="/learn" className="hover:underline">Learn</a>
          <a href="/tools" className="hover:underline">Tools</a>
          <a href="/pricing" className="hover:underline">Pricing</a>
          <a href="/login" className="hover:underline">Login</a>
        </div>
      </div>
    </nav>
  )
} 