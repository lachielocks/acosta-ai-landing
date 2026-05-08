"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="get-started" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative rounded-[40px] bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-white px-8 lg:px-16 py-16 lg:py-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0 blur-0 scale-100" : "opacity-0 translate-y-8 blur-md scale-[0.98]"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />

          <div className="relative z-10 text-center space-y-10">
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight leading-[0.95]">
              Ready to transform
              <br />
              your learning?
            </h2>

            <a
              href="https://platform.acosta-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-background text-foreground rounded-3xl font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              Get Started Now
              <ArrowRight className="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
