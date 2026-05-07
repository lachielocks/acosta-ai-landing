"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "I love the swirly mouse thingy.",
    author: "Cassidy M.",
    role: "Year 9 Student",
  },
  {
    quote:
      "The exam simulation tools are genuinely useful in class prep. Students come in more confident and focused.",
    author: "Mr. Daniel R.",
    role: "Science Department",
  },
  {
    quote:
      "I use Acosta daily for revision plans and quick feedback. It saves me hours each week without shortcuts.",
    author: "Noah T.",
    role: "First-Year Engineering Student",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const restartInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
  };

  useEffect(() => {
    restartInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    restartInterval();
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    restartInterval();
  };

  return (
    <section
      id="testimonials"
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
          className={`min-h-[170px] text-3xl md:text-4xl lg:text-5xl font-display leading-[1.2] transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-block"
            >
              “{testimonials[activeIndex].quote}”
            </motion.span>
          </AnimatePresence>
        </blockquote>

        <div className="mt-8 flex items-center justify-between gap-6 flex-wrap">
          <div className="text-muted-foreground">
            <p className="text-lg text-foreground">{testimonials[activeIndex].author}</p>
            <p className="text-sm">{testimonials[activeIndex].role}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={goPrevious}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/70 transition hover:border-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => {
                  setActiveIndex(idx);
                  restartInterval();
                }}
                className={`h-1.5 w-10 transition-all ${
                  idx === activeIndex ? "bg-foreground" : "bg-foreground/20"
                }`}
              />
            ))}
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={goNext}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/70 transition hover:border-foreground hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
