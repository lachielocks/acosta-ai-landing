import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FooterSection } from "@/components/landing/footer-section";
import { SeasonDecor } from "@/components/season/season-decor";
import { SeasonProvider } from "@/components/season/season-provider";
import { ThanksContent } from "@/components/landing/thanks-content";
import { Reveal } from "@/components/ui/reveal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thanks | Acosta AI",
  description: "A personal thank you to the people, ideas and moments behind Acosta AI.",
  alternates: { canonical: `${SITE_URL}/thanks` },
  openGraph: {
    title: "Thanks | Acosta AI",
    description: "A personal thank you to the people, ideas and moments behind Acosta AI.",
    url: `${SITE_URL}/thanks`,
    siteName: "Acosta AI",
    type: "article",
    locale: "en_AU",
  },
};

export default function ThanksPage() {
  return (
    <SeasonProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <SeasonDecor />

        <div className="relative pt-16 sm:pt-20">
          <header className="mx-auto max-w-[1200px] px-6 pb-16 lg:px-8 lg:pb-24">
            <Reveal>
              <Link href="/" className="link-wipe link-wipe-flex text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mb-5 mt-10 font-mono text-xs tracking-[0.2em] text-muted-foreground">A personal note</p>
              <h1 className="font-display text-6xl tracking-tight sm:text-7xl md:text-8xl">Thanks.</h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
                Acosta was founded, designed and developed independently. But no idea grows on its own.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                This is for the people who shaped it, encouraged it, taught me, tried it, and made the journey more meaningful along the way.
              </p>
            </Reveal>
          </header>

          <ThanksContent />
        </div>

        <FooterSection />
      </main>
    </SeasonProvider>
  );
}
