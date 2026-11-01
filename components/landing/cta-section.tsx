"use client";

import { useSeason } from "@/components/season/season-provider";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { usePlatformUser } from "@/hooks/use-platform-user";
import { PLATFORM_URL, getPlatformCtaLabels } from "@/lib/platform-user";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { user } = usePlatformUser();
  const labels = getPlatformCtaLabels(user);
  const { theme } = useSeason();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.25, rootMargin: "0px 0px -20% 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="get-started" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative rounded-[40px] bg-gradient-to-br from-[var(--season-accent)] to-[var(--season-accent-2)] text-white px-8 lg:px-16 py-16 lg:py-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0 blur-0 scale-100" : "opacity-0 translate-y-8 blur-md scale-[0.98]"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />

          <div className="relative z-10 text-center space-y-8 sm:space-y-10">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tight leading-[0.95]">
              {theme.ctaHeading[0]}
              <br />
              {theme.ctaHeading[1]}
            </h2>

            <a
              href={PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-md items-center justify-center gap-3 rounded-3xl bg-background px-8 py-5 text-xl font-black text-foreground shadow-2xl transition-all hover:scale-105 active:scale-95 sm:w-auto sm:px-12 sm:py-6 sm:text-2xl"
            >
              {labels.cta}
              <ArrowRight className="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
