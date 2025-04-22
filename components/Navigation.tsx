'use client';
import Image from 'next/image';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <div className="logo">
        <a href="/">
          <Image 
            src="/logo.png"
            alt="1000Headlines Logo"
            width={72}
            height={35.3} // ratio 2.04
            priority
            style={{ 
              objectFit: 'contain',
              height: 'auto'
            }}
            className="logo-image"
          />
        </a>
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