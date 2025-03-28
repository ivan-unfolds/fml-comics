import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "../_lib/redis";
import OpenAI from "openai";

// OPTIONAL: You could do a direct fetch to the ChatGPT endpoint if it supports images
// or use the official "openai" library with a custom fetch. The example below does a direct fetch call.
export async function POST(req: NextRequest) {
  try {
    const { participantName, imageUrl } = await req.json();
    if (!participantName || !imageUrl) {
      return NextResponse.json(
        { error: "Missing participantName or imageUrl" },
        { status: 400 }
      );
    }

    const openAiApiKey = process.env.OPENAI_API_KEY;
    if (!openAiApiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey: openAiApiKey });

    const systemPrompt =
      "You are a mystical fortune teller with real palmistry knowledge, inspired by Alejandro Jodorowsky.";
    const userPrompt = [
      {
        type: "text" as const,
        text: ` Based on an image of a palm, craft a short, poetic prophecy (80-150 words). The reading should be 70% based on traditional palmistry (analyzing the heart line, head line, life line, fate line, and hand shape) and 30% surreal, cosmic wisdom. Blend real analysis with metaphors, adventure, and a sense of mystery. Start with a mystical emoji (🔮, 🌙, ✨) and end with another emoji or emoticon (◕‿◕, 🌟, ☀️). Make it feel profound yet playful, as if revealing a hidden truth of the universe.\n`,
      },
      {
        type: "image_url" as const,
        image_url: {
          url: imageUrl,
        },
      },
    ];

    const completionData = await openai.chat.completions.create({
      model: "gpt-4.5-preview-2025-02-27",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const prophecyText =
      completionData?.choices?.[0]?.message?.content ||
      "No prophecy generated.";

    // Store record in Redis
    const client = await getRedisClient();
    const record = {
      imageUrl,
      participantName,
      prophecyText,
      timestamp: Date.now(),
    };
    // We'll store each entry in a list called "prophecies" (LIFO).
    await client.lPush("prophecies", JSON.stringify(record));

    // 3) Return final data
    return NextResponse.json(record, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Error generating prophecy" },
      { status: 500 }
    );
  }
}
