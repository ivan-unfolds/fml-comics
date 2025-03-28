import { NextResponse } from "next/server";
import { getRedisClient } from "../_lib/redis";

export async function GET() {
  try {
    const client = await getRedisClient();
    // LIFO list, so newest is index 0
    const items = await client.lRange("prophecies", 0, -1);
    const prophecies = items.map((str) => JSON.parse(str));
    // The board's front-end does additional sorting, but we can optionally sort here if needed:
    // prophecies.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    return NextResponse.json(prophecies, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error fetching prophecies" }, { status: 500 });
  }
}