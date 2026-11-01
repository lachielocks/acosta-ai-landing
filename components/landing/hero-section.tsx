"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import { useSeason } from "@/components/season/season-provider";
import { Reveal } from "@/components/ui/reveal";
import { HeroParticleTitle } from "@/components/landing/hero-particle-title";
import { usePlatformUser } from "@/hooks/use-platform-user";
import { PLATFORM_URL, getPlatformCtaLabels } from "@/lib/platform-user";


export function HeroSection() {
  const { user } = usePlatformUser();
  const labels = getPlatformCtaLabels(user);
  // Resolved on the client (date, app preview cookie or ?season=), so the static build stays neutral.
  const { theme, ready } = useSeason();
  const season = ready ? theme : null;
  const secondaryCta =
    user?.plan === "free"
      ? { href: "#pricing", label: "Compare plans" }
      : { href: "#features", label: "See features" };

  return (
    <section
      style={{ backgroundImage: `linear-gradient(to bottom, ${theme.gradient.join(", ")})`, ["--hero-accent" as string]: theme.accent }}
      className="relative overflow-x-clip text-white transition-[background-image] duration-700 pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full blur-[130px] transition-colors duration-700" style={{ backgroundColor: theme.glows[0] }} />
        <div className="absolute bottom-0 right-[10%] h-[360px] w-[360px] rounded-full blur-[120px] transition-colors duration-700" style={{ backgroundColor: theme.glows[1] }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center">
        <div data-intro-hide>
        <Reveal delay={0.04} distance={10} blur={4} triggerMargin="0px 0px -12% 0px">
          <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-white/75" style={theme.id ? { borderColor: `color-mix(in srgb, ${theme.accent} 45%, transparent)`, color: theme.accent } : undefined}>
            {theme.badge}
          </p>
        </Reveal>

        </div>

        <div className="relative z-30">
          <Reveal delay={0.1} distance={12} blur={6} triggerMargin="0px 0px -12% 0px">
            <h1 className="sr-only">{theme.title}</h1>
            <div className="font-display" style={{ minHeight: season ? undefined : "1px" }}>
              {season && <HeroParticleTitle key={season.title} text={season.title} highlightColor={season.id ? season.accent : "#2f2fba"} />}
            </div>
            {theme.subtitle && (
              <p
                className="season-subtitle relative z-40 mt-2 font-display text-2xl italic sm:text-3xl"
                style={{ backgroundImage: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
              >
                {theme.subtitle}
              </p>
            )}
          </Reveal>
        </div>

        <div data-intro-hide>
        <Reveal delay={0.16} distance={12} blur={6} triggerMargin="0px 0px -12% 0px">
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            {theme.heroBlurb}
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
          <HeroPrompt placeholder={theme.placeholder} />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {[
            { value: "Pause", label: "Daily puzzles for study breaks" },
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

const MAX_PROMPT = 2000;

function HeroPrompt({ placeholder }: { placeholder: string }) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const canSend = value.trim().length > 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const send = () => {
    const prompt = value.trim();
    if (!prompt) return;
    window.open(`${PLATFORM_URL}/?prompt=${encodeURIComponent(prompt)}&send=true`, "_blank");
  };

  return (
    <form
      className="group mx-auto mt-8 flex w-full max-w-xl items-end gap-2 rounded-[28px] border border-white/15 bg-white/[0.06] p-2 pl-5 text-left shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all hover:border-white/25 focus-within:border-[color:var(--hero-accent)] focus-within:bg-white/[0.09] focus-within:shadow-[0_0_0_4px_color-mix(in_srgb,var(--hero-accent)_22%,transparent)]"
      onSubmit={(e) => { e.preventDefault(); send(); }}
    >
      <label htmlFor="hero-prompt" className="sr-only">Ask Acosta</label>
      <textarea
        id="hero-prompt"
        ref={ref}
        name="prompt"
        rows={1}
        maxLength={MAX_PROMPT}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            send();
          }
        }}
        placeholder={placeholder}
        className="max-h-40 min-h-[44px] w-full resize-none bg-transparent py-2.5 text-base leading-6 text-white placeholder:text-white/45 outline-none"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Ask Acosta"
        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-all hover:scale-105 active:scale-95 disabled:cursor-default disabled:bg-white/15 disabled:text-white/40 disabled:hover:scale-100"
        style={canSend ? { backgroundColor: "var(--hero-accent)", color: "#fff" } : undefined}
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
      </button>
    </form>
  );
}
