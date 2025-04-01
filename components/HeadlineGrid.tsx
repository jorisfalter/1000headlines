'use client';

import { useEffect, useState } from 'react';
import HeadlineCard from './HeadlineCard';
import type { Headline } from '@/types';

interface HeadlineGridProps {
  platform?: string;
  industry?: string;
  search?: string;
}

const HeadlineGrid = ({ platform, industry, search }: HeadlineGridProps) => {
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeadlines = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (platform) params.append('platform', platform);
        if (industry) params.append('industry', industry);
        if (search) params.append('search', search);

        const res = await fetch(`/api/headlines?${params}`);
        const data = await res.json();
        setHeadlines(data);
      } catch (error) {
        console.error('Error fetching headlines:', error);
      }
      setLoading(false);
    };

    fetchHeadlines();
  }, [platform, industry, search]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="headline-grid">
      {headlines.map(headline => (
        <HeadlineCard
          key={headline.id}
          platform={headline.media}
          title={headline.headline}
          industry={headline.brand}
          date={new Date(headline.createdAt).toLocaleDateString()}
        />
      ))}
    </div>
  );
};

export default HeadlineGrid; 