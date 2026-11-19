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
  metadataBase: new URL("https://allan-kj.github.io/Allan-portfolio"),
  title: "Allan K.J (Allan K J) — Cybersecurity & Full-Stack Developer",
  description:
    "Official portfolio of Allan K.J (Allan K J) — B.Tech CSE (Cybersecurity) student at Karunya Institute of Technology and Sciences, specializing in enterprise IT security, networking, and full-stack development.",
  keywords: [
    "Allan K.J",
    "Allan K J",
    "Allan KJ",
    "Allan K. J.",
    "Allan Karunya",
    "Allan Cybersecurity",
    "Full-Stack Developer",
    "Allan portfolio",
  ],
  authors: [{ name: "Allan K.J", url: "https://allan-kj.github.io/Allan-portfolio/" }],
  alternates: {
    canonical: "https://allan-kj.github.io/Allan-portfolio/",
  },
  openGraph: {
    title: "Allan K.J — Cybersecurity & Full-Stack Developer",
    description:
      "Official portfolio of Allan K.J (Allan K J) — B.Tech CSE (Cybersecurity) student at Karunya Institute of Technology and Sciences.",
    url: "https://allan-kj.github.io/Allan-portfolio/",
    siteName: "Allan K.J Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allan K.J — Cybersecurity & Full-Stack Developer",
    description:
      "Official portfolio of Allan K.J — B.Tech CSE (Cybersecurity) student, open to internships.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google86647f30133a7bb7",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Allan K J",
  alternateName: ["Allan K.J", "Allan K. J.", "Allan KJ"],
  url: "https://allan-kj.github.io/Allan-portfolio/",
  jobTitle: "Cybersecurity & Full-Stack Developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Karunya Institute of Technology and Sciences",
  },
  sameAs: [
    "https://github.com/ALLAN-KJ",
    "https://linkedin.com/in/allan-k-j-21389838a",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${clashDisplay.variable} h-full antialiased font-sans`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
