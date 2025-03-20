import { NextResponse } from 'next/server';
import type { Headline } from '@/types';

export async function GET(request: Request) {
  // In a real app, this would fetch from a database
  const headlines: Headline[] = [
    {
      id: '1',
      platform: 'Facebook Ad',
      title: 'How I Generated $1M in Sales Using This One Weird Trick',
      industry: 'E-commerce',
      date: 'February 22, 2024',
      views: 2100,
      saves: 234,
    },
    // Add more headlines...
  ];

  return NextResponse.json(headlines);
} 