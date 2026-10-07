import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Geist_Mono, Newsreader } from "next/font/google";
import { ExperienceFrame } from "@/components/frame/experience-frame";
import { getEnv } from "@/lib/env";
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

const TITLE = "The Rhea Project | A Modern Voight-Kampff Test";
const DESCRIPTION =
  "A modern Voight-Kampff test adaptation. An encounter with Rhea, an artificial being unsure whether her memories are her own.";

export const generateMetadata = async () => {
  const { WEB_ORIGIN: webOrigin } = await getEnv();
  const metadata: Metadata = {
    metadataBase: new URL(webOrigin),
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

  return metadata;
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#10091e",
};

export default function RootLayout({ children, portrait }: LayoutProps<"/">) {
  const fontVariables = `${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`;

  return (
    <html lang="en" className={fontVariables} data-scroll-behavior="smooth">
      <body>
        <ExperienceFrame portraitLine={portrait}>{children}</ExperienceFrame>
      </body>
    </html>
  );
}
