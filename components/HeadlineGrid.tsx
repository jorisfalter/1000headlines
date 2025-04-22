'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HeadlineCard from './HeadlineCard';
import type { Headline } from '@/types';

const HeadlineGrid = () => {
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchHeadlines = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/headlines?${searchParams.toString()}`);
        const data = await res.json();
        setHeadlines(data);
      } catch (error) {
        console.error('Error fetching headlines:', error);
      }
      setLoading(false);
    };

    fetchHeadlines();
  }, [searchParams]);

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