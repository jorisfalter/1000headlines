import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Headline from '@/models/Headline';

export async function GET() {
  try {
    await dbConnect();
    
    // Add debug logging
    const total = await Headline.countDocuments();
    console.log('Total headlines:', total);

    const counts = await Headline.aggregate([
      {
        $match: {
          media: { $ne: null } // Changed from platform to media
        }
      },
      {
        $group: {
          _id: '$media', // Changed from platform to media
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

    console.log('Media counts:', counts); // Debug log
    return NextResponse.json(counts);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 