const SearchSection = () => {
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

      <div className="search-filters flex flex-col gap-4 md:flex-row md:items-center justify-center">
        <div className="search-bar w-[95%] md:flex-1 max-w-lg mx-auto md:mx-0">
          <input 
            type="text" 
            placeholder="Search headlines..." 
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
          />
        </div>

        <div className="filters w-[95%] md:w-auto flex gap-2 mx-auto md:mx-0">
          <select className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300">
            <option>All Types</option>
            <option>Facebook</option>
            <option>Google</option>
            <option>YouTube</option>
          </select>

          {/* <select className="industry-filter">
            <option>All Industries</option>
            <option>SaaS</option>
            <option>E-commerce</option>
          </select>

          <select className="sort-by">
            <option>Most Recent</option>
            <option>Most Popular</option>
            <option>Highest Converting</option>
          </select> */}
        </div>
      </div>
    </section>
  );
};

export default SearchSection; 