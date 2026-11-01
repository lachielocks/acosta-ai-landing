"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFools, FoolsDodge } from "@/components/season/fools";

const testimonials = [
  {
    quote: [
      "As a teacher, I have found this Acosta tool to be an absolute game changer for student learning and support. It provides students with instant, personalised help that feels like having a private tutor available at any time of the day.",
      "What I love most about it is how accessible and supportive it is for a wide range of learners. Students can use it to revise for assessments, practice a range of skills, and gain confidence with homework tasks independently. It encourages students to ask questions they may feel hesitant to ask in class and helps them work through problems at their own pace.",
      "As a teacher, I see this as an incredibly powerful support tool that extends learning beyond the classroom. It can make learning more personalised, interactive, and accessible for every student. I would highly recommend it to both teachers and students alike.",
    ],
    author: "Mme. Emma C.",
    role: "French Teacher",
    variant: "long" as const,
    durationMs: 14000,
  },
  {
    quote: "I love the swirly mouse thingy.",
    author: "Cassidy M.",
    role: "Year 9 Student",
    variant: "short" as const,
    durationMs: 7000,
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const fools = useFools();
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = testimonials[activeIndex];
  const isLong = active.variant === "long";

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

  const restartInterval = (index = activeIndex) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, testimonials[index].durationMs);
  };

  useEffect(() => {
    restartInterval(activeIndex);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex]);

  const goPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-28 lg:py-36 border-y border-foreground/10"
    >
      <motion.div layout className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <div className="mb-10">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-10 h-px bg-foreground/25" />
            {fools?.testimonialsEyebrow ?? "Students & teachers"}
          </span>
        </div>

        <blockquote
          className={`transition-all duration-700 ${
            isLong
              ? "min-h-[280px] md:min-h-[300px] text-lg md:text-xl lg:text-[1.35rem] font-display leading-relaxed text-foreground/95"
              : "min-h-[100px] text-3xl md:text-4xl lg:text-5xl font-display leading-[1.2]"
          } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {isLong ? (
                <motion.div className="space-y-4 md:space-y-5">
                  {(active.quote as string[]).map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="m-0">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              ) : (
                <span className="inline-block">{active.quote as string}</span>
              )}
            </motion.div>
          </AnimatePresence>
        </blockquote>

        <motion.div layout className="mt-8 flex items-center justify-between gap-6 flex-wrap">
          <motion.div key={activeIndex} className="text-muted-foreground">
            <p className="text-lg text-foreground">{active.author}</p>
            <p className="text-sm">{active.role}</p>
          </motion.div>

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
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 w-10 transition-all ${
                  idx === activeIndex ? "bg-foreground" : "bg-foreground/20"
                }`}
              />
            ))}
            <FoolsDodge width={96} height={72}>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={goNext}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/70 transition hover:border-foreground hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            </FoolsDodge>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
