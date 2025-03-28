import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DevTools from "./components/DevTools";

// Import your custom font
const myCustomFont = localFont({
  src: "../fonts/FmlComics-Regular.ttf",
  // Optionally, specify the CSS variable if you want to use it in your styles:
  variable: "--font-fml",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${myCustomFont.className} antialiased`}>
        {children}
        <DevTools />
      </body>
    </html>
  );
}
