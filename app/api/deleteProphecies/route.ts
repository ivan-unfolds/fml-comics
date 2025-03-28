import { createClient } from "redis";
import { NextResponse } from "next/server";

export async function GET() {
  const redis = createClient({
    url: process.env.REDIS_URL,
  });

  try {
    await redis.connect();
    // Clear all the keys in the current Redis database
    await redis.flushDb();

    return NextResponse.json({
      success: true,
      message: "All prophecies cleared",
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await redis.disconnect();
  }
}
