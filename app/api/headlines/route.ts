import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Headline from '@/models/Headline';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const industry = searchParams.get('industry');
    const search = searchParams.get('search');
    
    // Build query
    const query: any = {};
    if (platform && platform !== 'All Platforms') query.media = platform;
    if (industry && industry !== 'All Industries') query.industry = industry;
    if (search) query.title = { $regex: search, $options: 'i' };

    console.log('Query:', query);

    const headlines = await Headline.find(query)
      .sort({ createdAt: -1 });

    return NextResponse.json(headlines);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const headline = await Headline.create(data);
    return NextResponse.json(headline, { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 