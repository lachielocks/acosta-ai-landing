"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { ArrowRight, Flame, Sparkle, Zap } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { useAcosta2 } from "@/components/season/season-provider";
import { PLATFORM_URL } from "@/lib/platform-user";

/**
 * Acosta 2 launch section. Copy comes from the in-app Acosta 2 introduction
 * (acosta-ai lib/acostaIntroRoutes.ts + components/Acosta2IntroDialog.tsx) and Acosta Forma's
 * brand copy (lib/forma/brand.ts). Hidden until the release instant (lib/acosta2.ts).
 * Keeps its warm styling permanently, even after the site-wide fire theme ends.
 * Brand rule: no all-uppercase text.
 */
const modes = [
  { name: "Spark", description: "Quick, clear and ready when you are.", icon: Zap, tile: "bg-orange-500/10 text-orange-300" },
  { name: "Ember", description: "Thoughtful help for everyday learning.", icon: Sparkle, tile: "bg-orange-400/20 text-orange-200" },
  { name: "Blaze", description: "Deeper reasoning for life’s trickier questions.", icon: Flame, tile: "bg-[#9a3412] text-[#fff7ed]" },
] as const;

/** Same examples and picks as the in-app intro (Auto's rules choose these modes). */
const autoExamples = [
  { text: "G’day!", mode: 0 },
  { text: "Help me understand photosynthesis.", mode: 1 },
  { text: "Help me prove that this maths result is true.", mode: 2 },
] as const;

const card = "rounded-3xl border border-foreground/10 bg-foreground/[0.02]";

export function Acosta2Section() {
  const { released } = useAcosta2();
  if (!released) return null;

  return (
    <MotionConfig reducedMotion="user">
      <section id="acosta-2" className="relative scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12 text-center lg:mb-14">
            <Reveal direction="up">
              <h2 className="font-display text-4xl tracking-tight md:text-6xl">
                Introducing <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">Acosta 2.</span>
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.06}>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                The next chapter of Acosta is here. Smarter, more capable, and built to help you go further.
              </p>
            </Reveal>
          </div>

          <Reveal direction="up" delay={0.1}>
            <div className="relative overflow-hidden rounded-[32px] border border-foreground/10 bg-[#1a0606]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/acosta-2/acosta-2-banner.webp"
                alt="A glowing orange 2 surrounded by floating embers"
                width={1280}
                height={427}
                className="block aspect-[16/10] h-auto w-full object-cover sm:aspect-[1280/427]"
              />
            </div>
          </Reveal>

          <div className="mb-10 mt-20 text-center lg:mt-24">
            <Reveal direction="up">
              <h3 className="font-display text-3xl tracking-tight md:text-5xl">Meet Spark, Ember and Blaze.</h3>
            </Reveal>
            <Reveal direction="up" delay={0.06}>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Three ways to experience Acosta, from quick questions to your biggest challenges.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid gap-5 md:grid-cols-3">
            {modes.map((mode, i) => {
              const Icon = mode.icon;
              return (
                <StaggerItem key={mode.name} className="h-full">
                  <article className={`${card} h-full p-7 transition-all hover:-translate-y-1 hover:border-orange-400/30`}>
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${mode.tile}`}>
                      <Icon className="h-5 w-5" style={{ transform: `scale(${1 + i * 0.1})` }} aria-hidden="true" />
                    </div>
                    <h4 className="mt-5 text-2xl font-semibold">{mode.name}</h4>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{mode.description}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>

          <div className="mt-5 grid items-stretch gap-5 lg:grid-cols-2">
            <Reveal direction="up" className="h-full">
              <AutoCard />
            </Reveal>
            <Reveal direction="up" delay={0.08} className="h-full">
              <FormaCard />
            </Reveal>
          </div>

          <Reveal direction="up" className="mt-5">
            <div className={`relative overflow-hidden rounded-[32px] border border-foreground/10 px-8 py-16 text-center lg:px-16 lg:py-20`}>
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(60%_80%_at_50%_120%,rgba(249,115,22,0.22),transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-base font-medium text-orange-300">More power. More possibilities.</p>
                <h3 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">Your next chapter starts here.</h3>
                <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">Same Acosta. A whole new level of possibility.</p>
                <a
                  href={PLATFORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:scale-[1.02]"
                >
                  Try Acosta 2
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </MotionConfig>
  );
}

function AutoCard() {
  const [picked, setPicked] = useState(1);
  const mode = modes[autoExamples[picked].mode];
  return (
    <article className={`${card} flex h-full flex-col p-7 lg:p-9`}>
      <h3 className="font-display text-3xl tracking-tight">The right intelligence, right when you need it.</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        With Auto, just ask. Acosta reads your question and chooses a mode within your plan. Try these examples.
      </p>
      <div className="mt-auto pt-8">
        <div className="space-y-2">
          {autoExamples.map((ex, i) => (
            <button
              key={ex.text}
              type="button"
              aria-pressed={picked === i}
              onClick={() => setPicked(i)}
              className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors duration-300 ${
                picked === i
                  ? "border-orange-400/50 bg-orange-500/10 text-foreground"
                  : "border-foreground/10 text-foreground/80 hover:border-foreground/25 hover:bg-foreground/[0.03]"
              }`}
            >
              <span>{ex.text}</span>
              <ArrowRight className={`h-4 w-4 shrink-0 transition-colors ${picked === i ? "text-orange-300" : "text-muted-foreground"}`} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p role="status" className="mt-4 min-h-[3rem] text-sm leading-relaxed text-muted-foreground">
          Auto picks <strong className="font-semibold text-orange-300">{mode.name}</strong>. {mode.description}
        </p>
      </div>
    </article>
  );
}

/** The side-length example from the in-app intro, laid out like a Forma block: transparent, no title. Runs locally. */
function FormaCard() {
  const [side, setSide] = useState(4);
  const min = 1;
  const max = 10;
  const fill = ((side - min) / (max - min)) * 100;
  return (
    <article className={`${card} flex h-full flex-col p-7 lg:p-9`}>
      <h3 className="font-display text-3xl tracking-tight">Ideas, brought to life.</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Explore creative artwork, clear diagrams and interactive activities. Acosta Forma transforms ordinary responses into
        interactive experiences. Answers that take shape.
      </p>

      <div className="mt-auto pt-8">
        <div className="border-t border-foreground/10 pt-5">
          <div className="mb-4 flex justify-end">
            <span className="text-xs font-medium text-muted-foreground/80">Acosta Forma</span>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="acosta2-forma-side" className="text-sm font-medium">Side length</label>
            <span className="text-sm tabular-nums text-muted-foreground">{side} cm</span>
          </div>
          <input
            id="acosta2-forma-side"
            type="range"
            min={min}
            max={max}
            step={1}
            value={side}
            onChange={(e) => setSide(Number(e.target.value))}
            className="acosta2-range mt-3 w-full"
            style={{ ["--fill" as string]: `${fill}%` }}
          />
          <div className="mt-6 flex items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Area of the square</p>
              <p className="mt-1 font-display text-4xl tabular-nums tracking-tight">
                {side * side} <span className="text-xl text-muted-foreground">cm²</span>
              </p>
            </div>
            <div aria-hidden="true" className="relative h-[104px] w-[104px] shrink-0 rounded-lg border border-dashed border-foreground/15">
              <div
                className="absolute bottom-0 left-0 h-full w-full origin-bottom-left rounded-[6px] bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_0_18px_-6px_rgba(249,115,22,0.6)] transition-transform duration-300 ease-out motion-reduce:transition-none"
                style={{ transform: `scale(${side / max})` }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
