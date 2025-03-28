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
      "You are a whimsical fortune teller. Provide a playful prophecy based on the given palm image.";
    const userPrompt = [
      {
        type: "text" as const,
        text: `Here's an image of the participant's palm. Please analyze it (creatively) and invent a whimsical prophecy:\n`,
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
