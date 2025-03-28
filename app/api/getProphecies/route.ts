import { NextResponse } from 'next/server';
import { createClient } from 'redis';

export async function GET() {
  const redis = createClient({
    url: process.env.REDIS_URL,
  });

  try {
    await redis.connect();

    const keys = await redis.keys('*');
    const prophecies: Array<{
      imageUrl: string;
      participantName: string;
      prophecyText: string;
      timestamp?: number;
    }> = [];

    for (const key of keys) {
      const entry = await redis.get(key);
      if (entry) {
        try {
          prophecies.push(JSON.parse(entry));
        } catch {
          // If parsing fails, skip
        }
      }
    }

    return NextResponse.json(prophecies, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Unable to fetch prophecies' }, { status: 500 });
  } finally {
    await redis.disconnect();
  }
}