import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Allan K J — Cybersecurity & Full-Stack Developer",
  description:
    "Portfolio of Allan K J — B.Tech CSE (Cybersecurity) student at Karunya Institute of Technology and Sciences, specializing in enterprise IT security, networking, and full-stack development.",
  openGraph: {
    title: "Allan K J — Cybersecurity & Full-Stack Developer",
    description:
      "Portfolio of Allan K J — B.Tech CSE (Cybersecurity) student at Karunya Institute of Technology and Sciences, open to internships in security and software development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allan K J — Cybersecurity & Full-Stack Developer",
    description:
      "Portfolio of Allan K J — B.Tech CSE (Cybersecurity) student, open to internships.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
