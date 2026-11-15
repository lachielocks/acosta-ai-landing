"use client";

import { useState } from "react";
import { ArrowRight, Flame, FlameKindling, Sparkles, Wand2 } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { useAcosta2 } from "@/components/season/season-provider";
import { PLATFORM_URL } from "@/lib/platform-user";

/**
 * Acosta 2 launch section. Copy comes from the in-app Acosta 2 introduction
 * (acosta-ai lib/acostaIntroRoutes.ts) and Acosta Forma's brand copy (lib/forma/brand.ts).
 * Hidden until the release instant (lib/acosta2.ts).
 */
const modes = [
  { name: "Spark", description: "Quick, clear and ready when you are.", icon: Sparkles, color: "#fbbf24" },
  { name: "Ember", description: "Thoughtful help for everyday learning.", icon: FlameKindling, color: "#f97316" },
  { name: "Blaze", description: "Deeper reasoning for life’s trickier questions.", icon: Flame, color: "#ef4444" },
] as const;

/** Same examples the in-app intro shows; Auto's rules pick these modes. */
const autoExamples = [
  { text: "G’day!", mode: "Spark" },
  { text: "Help me understand photosynthesis.", mode: "Ember" },
  { text: "Help me prove that this maths result is true.", mode: "Blaze" },
] as const;

const modeColor = (name: string) => modes.find((m) => m.name === name)?.color ?? "currentColor";

export function Acosta2Section() {
  const { released } = useAcosta2();
  if (!released) return null;

  return (
    // The section keeps its fire styling permanently, even after the site-wide theme ends.
    <section id="acosta-2" className="relative scroll-mt-24 py-24 lg:py-32" style={{ ["--acosta2-fire" as string]: "#f97316" }}>
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal direction="up">
          <div className="relative overflow-hidden rounded-[32px] border border-orange-500/25 shadow-[0_0_80px_-20px_rgba(249,115,22,0.55)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/acosta-2/acosta-2-banner.webp"
              alt="A glowing orange 2 surrounded by floating embers"
              width={1280}
              height={427}
              className="block h-auto w-full"
            />
          </div>
        </Reveal>

        <div className="mt-14 text-center">
          <Reveal direction="up">
            <p className="mb-4 text-sm font-mono uppercase tracking-[0.2em]" style={{ color: "var(--acosta2-fire)" }}>Acosta 2</p>
          </Reveal>
          <Reveal direction="up" delay={0.06}>
            <h2 className="font-display text-4xl tracking-tight md:text-6xl">
              Introducing{" "}
              <span style={{ backgroundImage: "linear-gradient(90deg, #fbbf24, #f97316, #ef4444)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                Acosta 2.
              </span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              The next chapter of Acosta is here. Smarter, more capable, and built to help you go further.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 text-center">
          <Reveal direction="up">
            <h3 className="font-display text-3xl tracking-tight md:text-4xl">Meet Spark, Ember and Blaze.</h3>
          </Reveal>
          <Reveal direction="up" delay={0.06}>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Three ways to experience Acosta, from quick questions to your biggest challenges.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <StaggerItem key={mode.name}>
                <article
                  className="h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-7 transition-all hover:-translate-y-1 hover:border-foreground/30"
                  style={{ backgroundImage: `radial-gradient(circle at 0% 0%, color-mix(in srgb, ${mode.color} 12%, transparent), transparent 60%)` }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                    style={{ color: mode.color, borderColor: `color-mix(in srgb, ${mode.color} 35%, transparent)` }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-5 text-2xl font-semibold">{mode.name}</h4>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{mode.description}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal direction="up" className="h-full">
            <article className="h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-7 lg:p-9">
              <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">Auto</p>
              <h3 className="mt-3 font-display text-3xl tracking-tight">The right intelligence, right when you need it.</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                With Auto, just ask. Acosta reads your question and chooses a mode within your plan.
              </p>
              <ul className="mt-6 space-y-3">
                {autoExamples.map((ex) => (
                  <li key={ex.text} className="flex items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3">
                    <span className="text-sm text-foreground/85">{ex.text}</span>
                    <span
                      className="shrink-0 rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-[0.14em]"
                      style={{ color: modeColor(ex.mode), borderColor: `color-mix(in srgb, ${modeColor(ex.mode)} 40%, transparent)` }}
                    >
                      {ex.mode}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal direction="up" delay={0.08} className="h-full">
            <article className="h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-7 lg:p-9">
              <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">Acosta Forma</p>
              <h3 className="mt-3 font-display text-3xl tracking-tight">Ideas, brought to life.</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Explore creative artwork, clear diagrams and interactive activities. Acosta Forma transforms ordinary
                responses into interactive experiences. Answers that take shape.
              </p>
              <FormaSquareDemo />
            </article>
          </Reveal>
        </div>

        <Reveal direction="up">
          <div
            className="relative mt-5 overflow-hidden rounded-[32px] border border-foreground/10 px-8 py-14 text-center lg:px-16 lg:py-20"
            style={{ background: "linear-gradient(135deg, #2a0c06, #120403)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/acosta-2/ember-leaf.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
            />
            <div className="relative z-10">
              <p className="mx-auto mb-4 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-white/70">
                <Wand2 className="h-4 w-4" aria-hidden="true" /> More power. More possibilities.
              </p>
              <h3 className="font-display text-4xl tracking-tight text-white md:text-6xl">Your next chapter starts here.</h3>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">Same Acosta. A whole new level of possibility.</p>
              <a
                href={PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:scale-[1.02]"
              >
                Try Acosta 2
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The square example from the in-app intro. Runs locally; no AI calls. */
function FormaSquareDemo() {
  const [side, setSide] = useState(4);
  return (
    <div className="relative mt-6 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5">
      <span className="absolute right-4 top-3 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">Acosta Forma</span>
      <label htmlFor="forma-side" className="flex items-center justify-between pr-24 text-sm">
        <span>Side length</span>
        <span className="font-mono text-foreground/80">{side} cm</span>
      </label>
      <input
        id="forma-side"
        type="range"
        min={1}
        max={10}
        step={1}
        value={side}
        onChange={(e) => setSide(Number(e.target.value))}
        className="mt-3 w-full"
        style={{ accentColor: "var(--acosta2-fire)" }}
      />
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Area of the square</p>
          <p className="font-display text-3xl">{side * side} cm²</p>
        </div>
        <div className="flex h-16 w-16 items-end justify-start">
          <div
            className="rounded-sm transition-all duration-300"
            style={{ width: `${side * 6.4}px`, height: `${side * 6.4}px`, background: "color-mix(in srgb, var(--acosta2-fire) 70%, transparent)" }}
          />
        </div>
      </div>
    </div>
  );
}
