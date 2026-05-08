"use client";

import { Brain, Mic, ScanEye, Search, Cpu, Activity } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const features = [
  {
    icon: Brain,
    title: "Deep Thinking",
    description:
      "Get step-by-step reasoning that helps you learn the why, not just the final answer.",
    color: "text-pink-500",
  },
  {
    icon: Mic,
    title: "Live Voice",
    description:
      "Talk naturally with Acosta for language practice, revision, and quick explanations.",
    color: "text-red-500",
  },
  {
    icon: ScanEye,
    title: "Content Intelligence",
    description:
      "Analyze PDFs, images, and handwritten notes to extract key ideas and summaries.",
    color: "text-emerald-500",
  },
  {
    icon: Search,
    title: "Web Search",
    description:
      "Use real-time web results with clear sources when accuracy and citations matter.",
    color: "text-blue-500",
  },
  {
    icon: Cpu,
    title: "Exam Simulation",
    description:
      "Practice timed exam-style questions with instant grading and gap analysis.",
    color: "text-purple-500",
  },
  {
    icon: Activity,
    title: "Acosta Guardian",
    description:
      "Track workload and wellbeing to prevent burnout and keep study sustainable.",
    color: "text-indigo-500",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <Reveal direction="up">
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-[0.2em] mb-4">
              Features
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.06}>
            <h2 className="text-4xl md:text-6xl font-display tracking-tight">
              Everything you need to excel.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete suite of tools for students and teachers, built with privacy and clarity in mind.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <article className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-7 transition-all hover:border-foreground/30 hover:-translate-y-1">
                  <div
                    className={`w-11 h-11 rounded-2xl border border-foreground/10 flex items-center justify-center ${feature.color}`}
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
