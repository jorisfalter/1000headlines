import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Headline from '@/models/Headline';

export async function GET() {
  try {
    await dbConnect();
    
    const counts = await Headline.aggregate([
      {
        $group: {
          _id: '$media',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          media: '$_id',
          count: 1
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    return NextResponse.json(counts);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 