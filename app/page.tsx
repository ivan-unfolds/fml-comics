"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";

// Import your custom font
const fmlFont = localFont({
  src: "../fonts/FmlFat-Regular.ttf",
  // Optionally, specify the CSS variable if you want to use it in your styles:
  variable: "--font-fml",
});

interface Prophecy {
  imageUrl: string;
  participantName: string;
  prophecyText: string;
  timestamp?: number;
}

export default function Home() {
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
        Palm Pilot
      </h1>

      <div className="w-full max-w-3xl mb-12 bg-white border rounded-lg p-6 shadow-sm">
        <Image
          src="/palmistry.png"
          alt="Palm Reading Guide"
          className="rounded-lg mx-auto pb-5"
          width={295}
          height={332}
        />
        <div className="space-y-4 text-gray-700">
          <h2
            className={`${fmlFont.className} text-3xl text-center mb-4 uppercase`}
          >
            ✨ A Handy Guide to Palm Reading ✨
          </h2>
          <p className="text-center mb-6">
            Your palm is a map of your journey—past, present, and future. Here's
            what the major lines reveal:
          </p>
          <div className="space-y-3">
            <p>
              <span className="font-semibold">🖤 Heart Line</span> – The path of
              love, emotions, and relationships. A deep curve? Passionate! A
              straight line? Logical in love. Breaks? Heartaches and
              transformations.
            </p>
            <p>
              <span className="font-semibold">🧠 Head Line</span> – Your mind's
              signature. A long, straight line means sharp logic, while a wavy
              one signals creativity. The deeper, the stronger your focus.
            </p>
            <p>
              <span className="font-semibold">🌿 Life Line</span> – Not about
              lifespan, but life force! A bold curve means energy and
              resilience, while a faint or fragmented one suggests multiple
              reinventions.
            </p>
            <p>
              <span className="font-semibold">⚡ Fate Line</span> (if visible) –
              The road of destiny. A strong fate line suggests a clear path,
              while a broken one shows twists, changes, and unexpected turns.
            </p>
          </div>
          <p className="text-center mt-6">
            Your hands tell a story—what do yours say? 🔮✨
          </p>
        </div>
      </div>

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
              <div className="my-4 mx-[-16px]">
                <div className="relative">
                  <Image
                    src={card.imageUrl}
                    alt={`${card.participantName}-img`}
                    width={400}
                    height={400}
                    className="object-contain grayscale w-full contrast-150 brightness-125"
                  />
                  {/* <div className="absolute inset-0 bg-purple-600 opacity-10"></div> */}
                </div>
              </div>
              <p className="text-sm font-sans">{card.prophecyText}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
