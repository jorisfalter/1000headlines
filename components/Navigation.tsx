'use client';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <div className="logo">
        <a href="/">HeadlineFolio</a>
      </div>
      <div className="nav-links">
        <a href="/inspiration">Inspiration</a>
        <a href="/categories">Categories</a>
        <a href="/templates">Templates</a>
        <a href="/learn">Learn</a>
        <a href="/tools">Tools</a>
        <a href="/pricing">Pricing</a>
        <a href="/login" className="login-btn">Login</a>
      </div>
    </nav>
  );
};

export default Navigation; 