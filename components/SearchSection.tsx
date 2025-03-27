const SearchSection = () => {
  return (
    <section className="search-section">
        <h1>The Best Advertising Headlines Collection,<br></br>
        Copy, Titles and More</h1>
      <p>Discover and get inspired by the most compelling headlines across different platforms and industries.</p>

      <div className="search-filters">
        <div className="search-bar">
          <input type="text" placeholder="Search headlines..." />
        </div>

        <div className="filters">
          <select className="platform-filter">
            <option>All Platforms</option>
            <option>Facebook</option>
            <option>Google</option>
            <option>YouTube</option>
          </select>

          <select className="industry-filter">
            <option>All Industries</option>
            <option>SaaS</option>
            <option>E-commerce</option>
          </select>

          <select className="sort-by">
            <option>Most Recent</option>
            <option>Most Popular</option>
            <option>Highest Converting</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default SearchSection; 