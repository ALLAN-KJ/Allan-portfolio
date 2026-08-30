import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
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
      className={`${inter.variable} h-full antialiased font-sans`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
