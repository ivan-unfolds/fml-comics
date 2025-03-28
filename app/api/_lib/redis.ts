import { createClient } from "redis";

let cachedClient: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
  if (!cachedClient) {
    cachedClient = createClient({
      url: process.env.REDIS_URL, // Provided by Vercel Redis
    });
    cachedClient.on("error", (err) => console.error("Redis Client Error", err));
    await cachedClient.connect();
  }
  return cachedClient;
}