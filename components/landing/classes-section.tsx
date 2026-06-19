"use client";

import {
  BookOpen,
  ClipboardList,
  MessageSquare,
  Users,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { PLATFORM_URL, getPlatformCtaLabels } from "@/lib/platform-user";
import { usePlatformUser } from "@/hooks/use-platform-user";

const teacherPoints = [
  {
    icon: ClipboardList,
    title: "Assign tasks in seconds",
    description:
      "Set revision prompts, practice questions, or project briefs and push them straight to your class — no extra logins, no clunky LMS handoffs.",
  },
  {
    icon: Users,
    title: "One class, one workspace",
    description:
      "Invite students with a code, see who has joined, and keep everyone on the same page without broadcasting your personal chats.",
  },
  {
    icon: MessageSquare,
    title: "Guided help, not answer dumps",
    description:
      "Tasks open in Acosta with academic integrity guardrails on, so students get support that still expects their own thinking.",
  },
  {
    icon: BookOpen,
    title: "Built for real classrooms",
    description:
      "Whether it is homework check-ins, exam prep sprints, or extension work, Classes extends what you already do — into the hours after the bell.",
  },
];

export function ClassesSection() {
  const { user } = usePlatformUser();
  const labels = getPlatformCtaLabels(user);

  return (
    <section id="classes" className="relative py-24 lg:py-32 border-y border-foreground/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <Reveal>
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-[0.2em] mb-4">
                New · Acosta Classes
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.05]">
                Teachers assign.
                <br />
                <span className="text-muted-foreground">Students actually finish.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Our biggest launch yet: structured class spaces where teachers assign tasks, students pick them up in Acosta, and learning continues with the same private tutor experience — scoped to your classroom.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href={PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                {labels.primaryShort}
              </a>
            </Reveal>
          </div>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {teacherPoints.map((point) => {
              const Icon = point.icon;
              return (
                <StaggerItem key={point.title}>
                  <article className="h-full rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-all hover:border-foreground/25 hover:-translate-y-0.5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-foreground/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{point.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
