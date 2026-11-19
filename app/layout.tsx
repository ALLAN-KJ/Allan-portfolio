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
  applicationName: "Allan K.J",
  title: "Allan K.J — Cybersecurity Specialist & Creative 3D Engineer",
  description:
    "Official interactive 3D portfolio of Allan K.J — Cybersecurity specialist and creative developer. Explore real-time WebGL experiences, IPsec VPN security research, and full-stack software engineering.",
  keywords: [
    "Allan K.J",
    "Allan K J",
    "Allan KJ",
    "Allan Karunya",
    "Allan Cybersecurity",
    "Full-Stack Developer",
    "Creative Developer",
    "Allan portfolio",
    "IPsec Sentinel",
  ],
  authors: [{ name: "Allan K.J", url: "https://allan-kj.github.io/Allan-portfolio/" }],
  alternates: {
    canonical: "https://allan-kj.github.io/Allan-portfolio/",
  },
  icons: {
    icon: [
      { url: "/Allan-portfolio/favicon.svg", type: "image/svg+xml" },
      { url: "/Allan-portfolio/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/Allan-portfolio/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/Allan-portfolio/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Allan K.J — Cybersecurity Specialist & Creative 3D Engineer",
    description:
      "Official interactive 3D portfolio of Allan K.J — Cybersecurity specialist and creative developer. Featuring real-time WebGL 3D scenes and security research.",
    url: "https://allan-kj.github.io/Allan-portfolio/",
    siteName: "Allan K.J",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allan K.J — Cybersecurity Specialist & Creative 3D Engineer",
    description:
      "Official interactive 3D portfolio of Allan K.J — Cybersecurity specialist and creative developer.",
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Allan K.J",
  alternateName: ["Allan K.J Portfolio", "Allan Portfolio", "Allan KJ"],
  url: "https://allan-kj.github.io/Allan-portfolio/",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Allan K J",
  alternateName: ["Allan K.J", "Allan K. J.", "Allan KJ"],
  url: "https://allan-kj.github.io/Allan-portfolio/",
  jobTitle: "Cybersecurity Specialist & Full-Stack Developer",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
