import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    { path: "../public/fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashDisplay-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
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
      className={`${inter.variable} ${clashDisplay.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
