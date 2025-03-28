import type { Metadata } from "next";
import "./globals.css";
import DevTools from "./components/DevTools";

export const metadata: Metadata = {
  title: "FML Comics",
  description: "Autobio comics (2016-2022)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-[url('/background-chikaboo.jpg')] bg-cover bg-center bg-fixed min-h-screen bg-no-repeat`}
      >
        {children}
        <DevTools />
      </body>
    </html>
  );
}
