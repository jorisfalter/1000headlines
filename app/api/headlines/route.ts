import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Headline from '@/models/Headline';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const search = searchParams.get('search');
    
    // First, let's log a sample document to see the structure
    const sampleDoc = await Headline.findOne();
    console.log('Sample document structure:', sampleDoc);

    let pipeline: any[] = [];

    if (search) {
      pipeline.push({
        $search: {
          index: 'default',
          text: {
            query: search,
            path: ['headline', 'brand', 'media'],  // Changed to match DB fields
            fuzzy: {
              maxEdits: 1
            }
          }
        }
      });

      pipeline.push({
        $project: {
          headline: 1,    // Changed to match DB fields
          brand: 1,
          media: 1,      // Changed from platform to media
          createdAt: 1,
          score: { $meta: "searchScore" }
        }
      });
    }

    if (platform && platform !== 'All Types') {
      pipeline.push({
        $match: { media: platform }  // Changed from platform to media
      });
    }

    pipeline.push({ $sort: { createdAt: -1 } });

    console.log('Search query:', search);
    console.log('Media filter:', platform);
    console.log('Pipeline:', JSON.stringify(pipeline, null, 2));

    if (pipeline.length === 0) {
      const headlines = await Headline.find().sort({ createdAt: -1 });
      console.log('Found headlines (find):', headlines.length);
      return NextResponse.json(headlines);
    }

    const headlines = await Headline.aggregate(pipeline);
    console.log('Found headlines (search):', headlines.length);
    console.log('Sample result:', headlines[0]);

    return NextResponse.json(headlines);
  } catch (error: unknown) {
    console.error('Database Error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
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