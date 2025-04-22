import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Headline from '@/models/Headline';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    
    let pipeline: any[] = [];

    const mediaType = type ? type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : null;
    console.log('Searching for media type:', mediaType);

    if (search) {
      pipeline.push({
        $search: {
          index: 'default',
          text: {
            query: search,
            path: ['headline', 'brand', 'media'],
            fuzzy: {
              maxEdits: 1
            }
          }
        }
      });
    }

    if (mediaType) {
      pipeline.push({
        $match: { media: mediaType }
      });
    }

    if (pipeline.length === 0) {
      const query = mediaType ? { media: mediaType } : {};
      const headlines = await Headline.find(query).sort({ createdAt: -1 });
      return NextResponse.json(headlines);
    }

    pipeline.push({ $sort: { createdAt: -1 } });

    const headlines = await Headline.aggregate(pipeline);
    console.log(`Found ${headlines.length} headlines for type: ${mediaType}`);

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