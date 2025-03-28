"use client";

import { useState, useRef, FormEvent } from "react";
import { upload, PutBlobResult } from "@vercel/blob/client";

export default function Home() {
  const [participantName, setParticipantName] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [prophecyText, setProphecyText] = useState("");

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("");
    setProphecyText("");

    try {
      if (!inputFileRef.current?.files?.length) {
        throw new Error("No file selected");
      }
      const file = inputFileRef.current.files[0];

      // Indicate that the upload is in progress
      setStatus("Uploading image to Vercel Blob...");
      
      // 1) Upload directly to Vercel Blob via ephemeral token from /api/uploadImage
      const blobResult: PutBlobResult = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/uploadImage",
        clientPayload: {
          participantName,
        },
      });

      // If successful, store the final URL
      setUploadedUrl(blobResult.url);
      setStatus("Image uploaded. Generating prophecy...");

      // 2) Generate prophecy with GPT-4 Vision on the server
      const response = await fetch("/api/generateProphecy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantName,
          imageUrl: blobResult.url
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error generating prophecy");
      }

      // Display prophecy text
      setProphecyText(data.prophecyText);
      setStatus("Prophecy generated!");
    } catch (err: any) {
      setError(err.message || "Upload / AI generation failed.");
      setStatus("");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Admin/Host Upload</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <label htmlFor="name" className="flex flex-col">
          <span className="font-medium mb-1">Participant Name:</span>
          <input
            id="name"
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter participant name"
            required
          />
        </label>

        <label htmlFor="file" className="flex flex-col">
          <span className="font-medium mb-1">Select Hand Image:</span>
          <input
            id="file"
            type="file"
            ref={inputFileRef}
            accept="image/*"
            className="border rounded p-2"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Submit
        </button>
      </form>

      {status && <p className="mt-4 text-green-600">{status}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {uploadedUrl && (
        <div className="mt-4">
          <p className="font-medium">Blob URL:</p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-700"
          >
            {uploadedUrl}
          </a>
        </div>
      )}

      {prophecyText && (
        <div className="mt-4 p-4 border rounded bg-gray-50 w-full max-w-sm">
          <h2 className="font-semibold mb-2">Prophecy:</h2>
          <p>{prophecyText}</p>
        </div>
      )}
    </main>
  );
}