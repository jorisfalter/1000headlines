'use client';

import { useEffect, useState } from 'react';
import HeadlineCard from './HeadlineCard';
import type { Headline } from '@/types';

const HeadlineGrid = () => {
  const [headlines, setHeadlines] = useState<Headline[]>([]);

  useEffect(() => {
    // Fetch headlines from API
    fetch('/api/headlines')
      .then(res => res.json())
      .then(data => setHeadlines(data));
  }, []);

  return (
    <div className="headline-grid">
      {headlines.map(headline => (
        <HeadlineCard
          key={headline.id}
          platform={headline.platform}
          title={headline.title}
          industry={headline.industry}
          date={headline.date}
          views={`${headline.views}`}
          saves={`${headline.saves}`}
        />
      ))}
    </div>
  );
};

export default HeadlineGrid; 