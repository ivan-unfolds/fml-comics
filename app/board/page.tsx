import Image from "next/image";

export default function BoardPage() {
  const mockCards = [
    {
      imageUrl: "/window.svg",
      participantName: "Alice",
      prophecyText: "You have a bright future ahead.",
    },
    {
      imageUrl: "/file.svg",
      participantName: "Bob",
      prophecyText: "Expect the unexpected in your journey.",
    },
    {
      imageUrl: "/globe.svg",
      participantName: "Charlie",
      prophecyText: "Travel will bring joy and fortune.",
    },
    {
      imageUrl: "/next.svg",
      participantName: "Diana",
      prophecyText: "Your creativity will unlock amazing opportunities.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-6">Communal Board</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl overflow-y-auto">
        {mockCards.map((card, idx) => (
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
    </main>
  );
}