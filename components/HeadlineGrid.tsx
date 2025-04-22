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

  const fetchHeadlines = async (params: URLSearchParams) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/headlines?${params}`);
      const data = await res.json();
      setHeadlines(data);
    } catch (error) {
      console.error('Error fetching headlines:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Listen for search updates from SearchSection
    const handleSearch = (event: CustomEvent) => {
      const { search, platform } = event.detail;
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (platform !== 'All Types') params.append('platform', platform);
      fetchHeadlines(params);
    };

    window.addEventListener('searchUpdate', handleSearch as EventListener);
    
    // Initial fetch
    const params = new URLSearchParams(window.location.search);
    fetchHeadlines(params);

    return () => {
      window.removeEventListener('searchUpdate', handleSearch as EventListener);
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!headlines.length) return <div>No headlines found</div>;

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