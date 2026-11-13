import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soumabho dihhhh status",
  description: "Official real-time dihhhh status tracker for Soumabho with bananas & brinjals in retro pixel art.",
  icons: {
    icon: "/soumabho.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart.variable} ${vt323.variable} h-full`}>
      <body className="min-h-full bg-[#1b0a2a] text-[#f7e6ff] antialiased selection:bg-[#ffdf00] selection:text-[#2d004b]">
        {children}
      </body>
    </html>
  );
}
