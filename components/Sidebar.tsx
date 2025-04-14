'use client';

import { useEffect, useState } from 'react';

interface MediaCount {
  media: string;
  count: number;
}

const Sidebar = () => {
  const [mediaCounts, setMediaCounts] = useState<MediaCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch('/api/headlines/count');
        const data = await res.json();
        console.log('Media counts data:', data);
        setMediaCounts(data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching counts:', error);
        setMediaCounts([]);
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <aside className="sidebar">
      <h3>Headline Type</h3>
      <ul>
        {isLoading ? (
          <li>Loading...</li>
        ) : mediaCounts && mediaCounts.length > 0 ? (
          mediaCounts.map(({ media, count }) => (
            <li key={media}>
              <a href={`/media?type=${media.toLowerCase().replace(/ /g, '-')}`}>
                {media} <span>({count})</span>
              </a>
            </li>
          ))
        ) : (
          <li>No source types found</li>
        )}
      </ul>

      {/* <h3>Industries</h3>
      <ul>
        <li><a href="/industry/saas">SaaS <span>(120)</span></a></li>
        <li><a href="/industry/ecommerce">E-commerce <span>(95)</span></a></li>
        <li><a href="/industry/finance">Finance <span>(82)</span></a></li>
      </ul> */}
    </aside>
  );
};

export default Sidebar; 