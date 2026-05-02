"use client";

import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#060b18] via-[#0b132a] to-black text-white pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#3b82f6]/20 blur-[130px]" />
        <div className="absolute bottom-0 right-[10%] h-[360px] w-[360px] rounded-full bg-[#6366f1]/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center">
        <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-white/75">
          Student-first AI platform
        </p>

        <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
          Learn{" "}
          <span className="bg-gradient-to-r from-[#93c5fd] via-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
            smarter.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
          Acosta AI is your private tutor, study partner, and classroom assistant built for students and teachers.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://platform.acosta-ai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:scale-[1.02]"
          >
            Get started free
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
          >
            View pricing
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {[
            { value: "100%", label: "Private by design" },
            { value: "Live", label: "Voice + multimodal help" },
            { value: "Exam-ready", label: "Practice and feedback" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
              <p className="font-display text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-white/65">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
