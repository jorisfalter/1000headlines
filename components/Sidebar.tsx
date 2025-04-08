'use client';

import { useEffect, useState } from 'react';

interface MediaCount {
  media: string;
  count: number;
}

const Sidebar = () => {
  const [mediaCounts, setMediaCounts] = useState<MediaCount[]>([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch('/api/headlines/count');
        const data = await res.json();
        setMediaCounts(data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <aside className="sidebar">
      <h3>Source Types</h3>
      <ul>
        {mediaCounts.map(({ media, count }) => (
          <li key={media}>
            <a href={`/media?type=${media.toLowerCase().replace(/ /g, '-')}`}>
              {media} <span>({count})</span>
            </a>
          </li>
        ))}
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