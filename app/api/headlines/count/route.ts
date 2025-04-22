import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Headline from '@/models/Headline';

export async function GET() {
  try {
    await dbConnect();
    
    const counts = await Headline.aggregate([
      {
        $match: {
          media: { $exists: true, $ne: null }
        }
      },
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

    console.log('Media type counts:', counts);
    return NextResponse.json(counts);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 