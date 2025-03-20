'use client';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Source Types</h3>
      <ul>
        <li><a href="/ads/facebook">Facebook Ads <span>(340)</span></a></li>
        <li><a href="/ads/google">Google Ads <span>(209)</span></a></li>
        <li><a href="/blog-titles">Blog Headlines <span>(140)</span></a></li>
        <li><a href="/youtube">YouTube Titles <span>(116)</span></a></li>
        <li><a href="/magazine">Magazine Headlines <span>(85)</span></a></li>
        <li><a href="/longform">Long Form Copy <span>(78)</span></a></li>
      </ul>

      <h3>Industries</h3>
      <ul>
        <li><a href="/industry/saas">SaaS <span>(120)</span></a></li>
        <li><a href="/industry/ecommerce">E-commerce <span>(95)</span></a></li>
        <li><a href="/industry/finance">Finance <span>(82)</span></a></li>
      </ul>
    </aside>
  );
};

export default Sidebar; 