"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Puzzle } from "lucide-react";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { SeasonDecor } from "@/components/season/season-decor";
import { SeasonProvider } from "@/components/season/season-provider";
import { APP_URL } from "@/lib/platform-user";

export const PAUSE_APP_URL = `${APP_URL}/pause`;

const games = [
  {
    id: "sudoku",
    name: "Sudoku",
    description: "A classic 9×9 logic grid with smart notes. About 5 to 10 minutes.",
  },
  {
    id: "mini",
    name: "Mini",
    description: "A fast, compact 5×5 daily crossword. About 2 to 5 minutes.",
  },
  {
    id: "shift",
    name: "Shift",
    description: "Slide rows and columns to match the target. About 2 to 4 minutes.",
  },
  {
    id: "orbit",
    name: "Orbit",
    description: "Rotate coupled concentric rings into place. About 2 to 4 minutes.",
  },
  {
    id: "echo",
    name: "Echo",
    description: "A short daily musical memory challenge. About 1 to 3 minutes.",
  },
] as const;

function PlayButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const classes =
    variant === "primary"
      ? "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
      : "inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-foreground/30 hover:bg-foreground/[0.06]";

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  );
}

export function PausePage() {
  return (
    <SeasonProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <SeasonDecor />
        <div className="relative z-50">
          <Navigation />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <Link
            href="/"
            className="link-wipe link-wipe-flex text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Puzzle className="h-7 w-7" aria-hidden="true" />
            </div>
            <h1 className="font-display text-4xl tracking-tight md:text-6xl">Pause</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Daily puzzles for a proper study break. A new Sudoku, Mini crossword, Shift, Orbit and
              Echo every day, plus optional AI challenges when you want a tougher round.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <PlayButton href={PAUSE_APP_URL}>
                Play today&apos;s puzzles
                <ArrowUpRight className="h-4 w-4" />
              </PlayButton>
              <PlayButton href="/" variant="secondary">
                Explore Acosta AI
                <ArrowRight className="h-4 w-4" />
              </PlayButton>
            </div>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <a
                key={game.id}
                href={`${PAUSE_APP_URL}/${game.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-7 transition-all hover:-translate-y-1 hover:border-foreground/30"
              >
                <h2 className="text-2xl font-semibold">{game.name}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{game.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-foreground">
                  Play {game.name}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            ))}
          </div>

          <p className="mt-12 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The five daily puzzles are free to play in the Acosta AI app, and you can start without an
            account. Optional AI challenges are included on every plan: five a day on Free, and
            unlimited on Go and Max.
          </p>
        </div>

        <FooterSection />
      </main>
    </SeasonProvider>
  );
}
