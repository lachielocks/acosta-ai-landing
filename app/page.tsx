import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FounderSection } from "@/components/landing/founder-section";
import { PrivacyTrustSection } from "@/components/landing/privacy-trust-section";
import { PrivacyCompareSection } from "@/components/landing/privacy-compare-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { SeasonProvider } from "@/components/season/season-provider";
import { SeasonDecor } from "@/components/season/season-decor";

export default function Home() {
  return (
    <SeasonProvider>
    <main className="relative min-h-screen overflow-x-hidden">
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
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FounderSection />
      <PrivacyTrustSection />
      <PrivacyCompareSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
      </div>
    </main>
    </SeasonProvider>
  );
}
