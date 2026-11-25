"use client";

import { useSeason } from "@/components/season/season-provider";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useFools } from "@/components/season/fools";
import { usePlatformUser } from "@/hooks/use-platform-user";
import { PLATFORM_URL, getPlatformCtaLabels } from "@/lib/platform-user";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { user } = usePlatformUser();
  const labels = getPlatformCtaLabels(user);
  const { theme } = useSeason();
  const fools = useFools();

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
    <section id="get-started" ref={sectionRef} className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-8">
        <div
          className={`relative flex flex-col gap-7 rounded-3xl border border-foreground/10 bg-background/55 px-6 py-8 backdrop-blur-sm transition-all duration-700 sm:px-10 sm:py-10 md:flex-row md:items-center md:justify-between md:gap-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="relative z-10 space-y-2 text-center md:text-left">
            <h2 className="font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-5xl">
              <span className="block">{theme.ctaHeading[0]}</span>
              <span className="block">{theme.ctaHeading[1]}</span>
            </h2>
          </div>
          <div className="relative z-10 flex justify-center md:shrink-0">
            <a
              href={PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0 sm:w-auto"
            >
              {fools && !user ? fools.ctaButton : labels.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
