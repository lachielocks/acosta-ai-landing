import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { Acosta2Section } from "@/components/landing/acosta2-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FounderSection } from "@/components/landing/founder-section";
import { PrivacyTrustSection } from "@/components/landing/privacy-trust-section";
import { FaqSection } from "@/components/landing/faq-section";
import { PauseSection } from "@/components/landing/pause-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { SeasonProvider } from "@/components/season/season-provider";
import { SeasonDecor } from "@/components/season/season-decor";
import { LandingRestoredToast } from "@/components/landing/landing-restored-toast";
import { Suspense } from "react";

export default function Home() {
  return (
    <SeasonProvider>
    <main className="relative min-h-screen overflow-x-hidden">
      <Suspense fallback={null}>
        <LandingRestoredToast />
      </Suspense>
      <SeasonDecor />
      {/* First-load intro: only the particle vortex shows; [data-intro-hide] fades in near its end (see globals.css). */}
      <noscript>
        <style>{"[data-intro-hide]{animation:none!important}"}</style>
      </noscript>
      <div data-intro-hide className="relative z-50">
        <Navigation />
      </div>
      <HeroSection />
      <div data-intro-hide>
      <Acosta2Section />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FounderSection />
      <PauseSection />
      <PrivacyTrustSection />
      <FaqSection />
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, color-mix(in oklch, #866876 10%, transparent) 24%, color-mix(in oklch, #b9877c 14%, transparent) 48%, color-mix(in oklch, #c6a17a 10%, transparent) 68%, var(--background) 100%)",
          }}
        />
        <CtaSection />
        <FooterSection />
      </div>
      </div>
    </main>
    </SeasonProvider>
  );
}
