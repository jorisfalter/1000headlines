import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Headline from '@/lib/models/Headline';

export async function GET() {
  try {
    await dbConnect();
    const headlines = await Headline.find({}).sort({ createdAt: -1 });
    return NextResponse.json(headlines);
  } catch (error) {
    console.error('Error fetching headlines:', error);
    return NextResponse.json(
      { error: 'Error fetching headlines' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { headline, brand, categories } = body;

    if (!headline || !brand || !categories || !Array.isArray(categories)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newHeadline = await Headline.create({
      headline,
      brand,
      categories
    });

    return NextResponse.json(newHeadline, { status: 201 });
  } catch (error) {
    console.error('Error adding headline:', error);
    return NextResponse.json(
      { error: 'Error adding headline' },
      { status: 500 }
    );
  }
} 