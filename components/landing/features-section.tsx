"use client";

import { useSeason } from "@/components/season/season-provider";
import { Activity, Cpu, Layers, MessageSquare, Puzzle, ScanEye, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const features = [
  {
    icon: MessageSquare,
    title: "Chat that teaches",
    description:
      "Fast, Core and Thinking modes, all with live web search. Thinking shows its reasoning so you learn the why, not just the answer.",
    color: "text-pink-500",
  },
  {
    icon: ScanEye,
    title: "Reads your stuff",
    description:
      "Drop in PDFs, photos of handwritten notes or a YouTube link and get the key ideas, summaries and questions back.",
    color: "text-emerald-500",
  },
  {
    icon: Cpu,
    title: "Exam practice",
    description:
      "Run timed exam simulations, or snap photos of a finished paper and get it marked with feedback.",
    color: "text-purple-500",
  },
  {
    icon: Layers,
    title: "Study tools",
    description:
      "Planner, flashcards, Mind Dump, study groups and Study Garden, a focus timer where your plants grow as you study.",
    color: "text-blue-500",
  },
  {
    icon: UsersRound,
    title: "Classes & Teach",
    description:
      "Teachers run classes, assign tasks and Live Quizzes, and prep, adapt and wrap up lessons with AI help.",
    color: "text-sky-500",
  },
  {
    icon: Puzzle,
    title: "Pause",
    description:
      "Five daily puzzles for a proper break: Sudoku, a mini crossword, Shift, Orbit and Echo, plus AI challenges.",
    color: "text-amber-500",
  },
  {
    icon: Activity,
    title: "Acosta Guardian",
    description:
      "Notices long sessions and late nights and nudges you to take a break before study turns into burnout.",
    color: "text-indigo-500",
  },
  {
    icon: ShieldCheck,
    title: "Learning Mode",
    description:
      "Turn it on and Acosta guides you to the answer instead of handing it over, so the work stays yours.",
    color: "text-teal-500",
  },
  {
    icon: Sparkles,
    title: "Ignite",
    description:
      "Community study resources, checked by a human before they go live. Available in selected regions.",
    color: "text-red-500",
  },
];

export function FeaturesSection() {
  const { theme } = useSeason();
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <Reveal direction="up">
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-[0.2em] mb-4">
              {theme.featuresEyebrow}
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.06}>
            <h2 className="text-4xl md:text-6xl font-display tracking-tight">
              {theme.featuresHeading}
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Chat, exam prep, study tools, classes and proper breaks. One place for students and teachers, built with privacy in mind.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <article className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-7 transition-all hover:border-foreground/30 hover:-translate-y-1">
                  <div
                    className={`w-11 h-11 rounded-2xl border border-foreground/10 flex items-center justify-center ${theme.id ? "" : feature.color}`}
                    style={theme.id ? { color: i % 2 ? theme.accent2 : theme.accent, borderColor: `color-mix(in srgb, ${i % 2 ? theme.accent2 : theme.accent} 30%, transparent)` } : undefined}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{feature.description}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
