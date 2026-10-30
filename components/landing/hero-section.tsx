"use client";

import { ArrowRight, MousePointerClick } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { HeroParticleTitle } from "@/components/landing/hero-particle-title";
import { usePlatformUser } from "@/hooks/use-platform-user";
import { PLATFORM_URL, getPlatformCtaLabels } from "@/lib/platform-user";

const HERO_TITLE = "Learn smarter.";

export function HeroSection() {
  const { user } = usePlatformUser();
  const labels = getPlatformCtaLabels(user);
  const secondaryCta =
    user?.plan === "free"
      ? { href: "#pricing", label: "Compare plans" }
      : { href: "#classes", label: "See Classes" };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#060b18] via-[#0b132a] to-black text-white pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#3b82f6]/20 blur-[130px]" />
        <div className="absolute bottom-0 right-[10%] h-[360px] w-[360px] rounded-full bg-[#6366f1]/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center">
        <div data-intro-hide>
        <Reveal delay={0.04} distance={10} blur={4} triggerMargin="0px 0px -12% 0px">
          <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-white/75">
            Now with Acosta Classes
          </p>
        </Reveal>

        </div>

        <div className="relative z-30">
          <Reveal delay={0.1} distance={12} blur={6} triggerMargin="0px 0px -12% 0px">
            <h1 className="sr-only">{HERO_TITLE}</h1>
            <div className="font-display">
              <HeroParticleTitle text={HERO_TITLE} />
            </div>
          </Reveal>
        </div>

        <div data-intro-hide>
        <Reveal delay={0.16} distance={12} blur={6} triggerMargin="0px 0px -12% 0px">
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            Acosta AI is your private tutor, study partner, and classroom assistant — with classes where teachers set the work and students get help that fits them.
          </p>
        </Reveal>

        <Reveal delay={0.22} distance={10} blur={4} triggerMargin="0px 0px -12% 0px">
          <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:scale-[1.02]"
            >
              {labels.primary}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              {secondaryCta.label}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.24} distance={10} blur={4} triggerMargin="0px 0px -12% 0px">
          <form 
            className="mt-8 mx-auto flex w-full max-w-lg items-center rounded-full border border-white/20 bg-white/5 p-1.5 backdrop-blur-md transition-all focus-within:border-white/40 focus-within:bg-white/10 hover:border-white/30"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const prompt = formData.get('prompt') as string;
              if (prompt.trim()) {
                window.open(`${PLATFORM_URL}/?prompt=${encodeURIComponent(prompt)}&send=true`, '_blank');
              }
            }}
          >
            <input
              name="prompt"
              type="text"
              placeholder="What do you want to learn today?"
              className="w-full bg-transparent px-5 py-2.5 text-base text-white placeholder-white/50 outline-none"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02] cursor-pointer"
            >
              Ask <MousePointerClick className="h-4 w-4" />
            </button>
          </form>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {[
            { value: "Classes", label: "Assign & track tasks" },
            { value: "Study", label: "Flashcards, planner, quizzes" },
            { value: "Exam-ready", label: "Simulations and marking" },
          ].map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={0.26 + i * 0.06}
              direction="up"
              distance={10}
              blur={4}
              triggerMargin="0px 0px -12% 0px"
            >
              <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
                <p className="font-display text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-white/65">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
