'use client';

import { useState } from 'react';

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedType !== 'All Types') params.append('platform', selectedType);
      
      // Update URL with search params
      window.history.pushState(
        {}, 
        '', 
        `${window.location.pathname}?${params.toString()}`
      );
      
      // Trigger search
      const event = new CustomEvent('searchUpdate', { 
        detail: { search: searchTerm, platform: selectedType } 
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <section className="search-section w-[95%] max-w-3xl mx-auto py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        The Best Advertising Headlines Collection,
        <br className="hidden md:block" />
        Titles and More
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Discover and get inspired by the most compelling headlines across different platforms and industries.
      </p>

      <form onSubmit={handleSearch} className="search-filters flex flex-col gap-4 md:flex-row md:items-center justify-center">
        <div className="search-bar w-[95%] md:flex-1 max-w-lg mx-auto md:mx-0">
          <input 
            type="text" 
            placeholder="Search headlines..." 
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters w-[95%] md:w-auto flex gap-2 mx-auto md:mx-0">
          <select 
            className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option>All Types</option>
            <option>Print</option>
            <option>Facebook Ad</option>
            <option>Blog</option>
            <option>Billboard</option>
            <option>Google Search Results</option>
          </select>
          <button 
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchSection; 