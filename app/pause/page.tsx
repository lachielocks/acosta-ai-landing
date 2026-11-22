import type { Metadata } from "next";
import { PausePage } from "@/components/landing/pause-page";
import { APP_URL } from "@/lib/platform-user";
import { SITE_URL } from "@/lib/site";

const title = "Pause: daily puzzles for study breaks | Acosta AI";
const description =
  "Play Pause, Acosta AI's free daily puzzle hub. A new Sudoku, Mini crossword, Shift, Orbit and Echo every day, plus optional AI challenges. Start in the app, no account needed.";
const pageUrl = `${SITE_URL}/pause`;
const pauseAppUrl = `${APP_URL}/pause`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: "Acosta AI",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pause",
  applicationCategory: "GameApplication",
  operatingSystem: "Web",
  url: pauseAppUrl,
  isPartOf: {
    "@type": "WebApplication",
    name: "Acosta AI",
    url: APP_URL,
  },
  description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "AUD",
  },
  hasPart: [
    {
      "@type": "VideoGame",
      name: "Sudoku",
      description: "A classic 9×9 logic grid with smart notes.",
      url: `${pauseAppUrl}/sudoku`,
    },
    {
      "@type": "VideoGame",
      name: "Mini",
      description: "A fast, compact 5×5 daily crossword.",
      url: `${pauseAppUrl}/mini`,
    },
    {
      "@type": "VideoGame",
      name: "Shift",
      description: "Slide rows and columns to match the target.",
      url: `${pauseAppUrl}/shift`,
    },
    {
      "@type": "VideoGame",
      name: "Orbit",
      description: "Rotate coupled concentric rings into place.",
      url: `${pauseAppUrl}/orbit`,
    },
    {
      "@type": "VideoGame",
      name: "Echo",
      description: "A short daily musical memory challenge.",
      url: `${pauseAppUrl}/echo`,
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PausePage />
    </>
  );
}
