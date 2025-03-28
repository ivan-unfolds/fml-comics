"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";

// Import your custom font
const fmlFont = localFont({
  src: "../../fonts/FmlFat-Regular.ttf",
  // Optionally, specify the CSS variable if you want to use it in your styles:
  variable: "--font-fml",
});

interface Prophecy {
  imageUrl: string;
  participantName: string;
  prophecyText: string;
  timestamp?: number;
}

export default function BoardPage() {
  const [prophecies, setProphecies] = useState<Prophecy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProphecies = async () => {
      try {
        const res = await fetch("/api/getProphecies");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        // Sort by timestamp descending if it exists, else keep as-is
        data.sort(
          (a: Prophecy, b: Prophecy) => (b.timestamp || 0) - (a.timestamp || 0)
        );
        setProphecies(data);
      } catch (err: any) {
        setError(err.message || "Error fetching prophecies");
      } finally {
        setLoading(false);
      }
    };

    fetchProphecies();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center p-4">
      <h1 className={`${fmlFont.className} text-6xl font-bold mb-6 uppercase`}>
        Communal Board
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl overflow-y-auto">
          {prophecies.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border  text-black p-4 rounded shadow-sm"
            >
              <div className={`${fmlFont.className} text-3xl uppercase`}>
                {card.participantName}
              </div>
              <div className="my-4">
                <Image
                  src={card.imageUrl}
                  alt={`${card.participantName}-img`}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-sans">{card.prophecyText}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
