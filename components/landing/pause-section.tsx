"use client";

import { ArrowUpRight, Coffee } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { APP_URL } from "@/lib/platform-user";

const pauseUrl = `${APP_URL}/pause`;

const games = [
  { id: "sudoku", name: "Sudoku", description: "A classic 9×9 logic grid with smart notes. About 5 to 10 minutes." },
  { id: "mini", name: "Mini", description: "A fast, compact 5×5 daily crossword. About 2 to 5 minutes." },
  { id: "shift", name: "Shift", description: "Slide rows and columns to match the target. About 2 to 4 minutes." },
  { id: "orbit", name: "Orbit", description: "Rotate coupled concentric rings into place. About 2 to 4 minutes." },
  { id: "echo", name: "Echo", description: "A short daily musical memory challenge. About 1 to 3 minutes." },
] as const;

export function PauseSection() {
  return (
    <section id="pause" className="relative scroll-mt-28 overflow-hidden border-t border-foreground/10 py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-[110px]" />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Reveal>
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                <Coffee className="h-7 w-7" aria-hidden="true" />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display text-5xl tracking-tight md:text-7xl">Pause</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Daily puzzles for a proper study break. A new Sudoku, Mini crossword, Shift, Orbit and Echo every day, plus optional AI challenges when you want a tougher round.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href={pauseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                Take five. Think differently.
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          <Stagger className="grid gap-3 sm:grid-cols-2" amount={0.15}>
            {games.map((game) => (
              <StaggerItem key={game.id}>
                <a
                  href={`${pauseUrl}/${game.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-3xl border border-foreground/10 bg-foreground/[0.025] p-6 transition-all hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-emerald-500/[0.04]"
                >
                  <h3 className="text-xl font-semibold">{game.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{game.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    Play {game.name}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The five daily puzzles are free to play in the Acosta AI app, and you can start without an account. Optional AI challenges are included on every plan: five a day on Free, and unlimited on Go and Max.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
