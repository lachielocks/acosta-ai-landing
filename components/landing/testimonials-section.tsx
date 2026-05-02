"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Acosta helps me break down hard topics into steps I can actually follow. It feels like having a tutor on demand.",
    author: "Year 11 Student",
    role: "HSC Pathway",
  },
  {
    quote:
      "The exam simulation tools are genuinely useful in class prep. Students come in more confident and focused.",
    author: "High School Teacher",
    role: "Science Department",
  },
  {
    quote:
      "I use Acosta daily for revision plans and quick feedback. It saves me hours each week without shortcuts.",
    author: "University Student",
    role: "STEM Faculty",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 border-y border-foreground/10"
    >
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <div className="mb-10">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-10 h-px bg-foreground/25" />
            Students & teachers
          </span>
        </div>

        <blockquote
          className={`text-3xl md:text-4xl lg:text-5xl font-display leading-[1.2] transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          key={activeIndex}
        >
          “{testimonials[activeIndex].quote}”
        </blockquote>

        <div className="mt-8 flex items-center justify-between gap-6 flex-wrap">
          <div className="text-muted-foreground">
            <p className="text-lg text-foreground">{testimonials[activeIndex].author}</p>
            <p className="text-sm">{testimonials[activeIndex].role}</p>
          </div>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 w-10 transition-all ${
                  idx === activeIndex ? "bg-foreground" : "bg-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
