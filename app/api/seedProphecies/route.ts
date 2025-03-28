import { createClient } from "redis";
import { NextResponse } from "next/server";

export async function GET() {
  const redis = createClient({ url: process.env.REDIS_URL });

  try {
    await redis.connect();
    const sampleData = [
      {
        imageUrl: "https://fml-comics.vercel.app/window.svg",
        participantName: "Alice",
        prophecyText: "A grand adventure awaits you.",
        timestamp: Date.now(),
      },
      {
        imageUrl: "https://fml-comics.vercel.app/window.svg",
        participantName: "Bob",
        prophecyText: "Fortune smiles upon you.",
        timestamp: Date.now(),
      },
    ];

    await Promise.all(
      sampleData.map((item, idx) =>
        redis.set(`prophecy_${idx}`, JSON.stringify(item))
      )
    );

    return NextResponse.json({ success: true, message: "Mock data seeded" });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  } finally {
    await redis.disconnect();
  }
}
