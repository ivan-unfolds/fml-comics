import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Optional: implement authentication/authorization here
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/gif", "image/jpg"],
          tokenPayload: JSON.stringify({
            participantName: clientPayload?.participantName || "Unknown",
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // This is called once the upload has succeeded.
        // For now, we simply log, but you could store the URL or do other actions.
        console.log("Upload completed for blob:", blob);
        console.log("Token payload:", tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Upload error" },
      { status: 400 }
    );
  }
}