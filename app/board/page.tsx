"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
        data.sort((a: Prophecy, b: Prophecy) => (b.timestamp || 0) - (a.timestamp || 0));
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
      <h1 className="text-2xl font-bold mb-6">Communal Board</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl overflow-y-auto">
          {prophecies.map((card, idx) => (
            <div
              key={idx}
              className="bg-yellow-100 border border-yellow-300 text-black p-4 rounded shadow-sm"
            >
              <div className="text-lg font-semibold">{card.participantName}</div>
              <div className="my-4">
                <Image
                  src={card.imageUrl}
                  alt={`${card.participantName}-img`}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <p className="text-sm">{card.prophecyText}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}