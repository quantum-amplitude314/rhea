import type { Metadata, Viewport } from "next";
import {
  Atkinson_Hyperlegible_Next,
  Geist_Mono,
  Newsreader,
} from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const headingFont = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-heading",
});

const bodyFont = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-sans",
});

const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const SITE_URL = "https://rhea.quantum-amplitude.tech";
const TITLE = "The Rhea Project | A Modern Voight-Kampff Test";
const DESCRIPTION =
  "A modern Voight-Kampff test adaptation. An encounter with Rhea, an artificial being unsure whether her memories are her own.";

// The shared image comes from opengraph-image.jpg beside this layout; X falls back to it.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: { url: "/icon.jpg", type: "image/jpeg", sizes: "192x192" },
    apple: { url: "/apple-icon.jpg", type: "image/jpeg", sizes: "180x180" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "The Rhea Project",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#10091e",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVariables = `${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`;

  return (
    <html lang="en" className={fontVariables} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
