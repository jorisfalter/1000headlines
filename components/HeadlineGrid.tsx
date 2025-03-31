'use client';

import React from 'react';
import HeadlineCard from './HeadlineCard';

interface Headline {
  _id: string;
  headline: string;
  brand?: string;
  categories: string[];
  createdAt: Date;
  views?: number;
  saves?: number;
}

interface HeadlineGridProps {
  headlines: Headline[];
}

export default function HeadlineGrid({ headlines = [] }: HeadlineGridProps) {
  if (!headlines || headlines.length === 0) {
    return <div>No headlines found</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {headlines.map((headline) => (
        <HeadlineCard
          key={headline._id}
          headline={headline.headline}
          brand={headline.brand || ''}
          categories={headline.categories}
          date={new Date(headline.createdAt).toLocaleDateString()}
          views={headline.views?.toString() || '0'}
          saves={headline.saves?.toString() || '0'}
        />
      ))}
    </div>
  );
} 