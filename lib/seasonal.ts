/**
 * Seasonal theming for the landing page. The event windows mirror the Acosta app
 * (acosta-ai lib/seasonalEvents.ts: SEASONAL_ANCHORS + SEASONAL_WINDOW_DAYS = 2 days
 * either side). Keep the two in sync if the app's dates change.
 */
export type SeasonalEventId = "pi_day" | "christmas" | "halloween" | "star_wars" | "april_fools" | "birthday";

export const SEASONAL_WINDOW_DAYS = 2;

export const SEASONAL_ANCHORS: Record<SeasonalEventId, { month: number; day: number; lastDay?: number }> = {
  birthday: { month: 2, day: 20 },
  pi_day: { month: 3, day: 14 },
  april_fools: { month: 4, day: 1 },
  star_wars: { month: 5, day: 4 },
  halloween: { month: 10, day: 31 },
  christmas: { month: 12, day: 24, lastDay: 26 },
};

/** Acosta was created 20 Feb 2026, so birthdays begin in 2027 (same rule as the app). */
const FIRST_BIRTHDAY_YEAR = 2027;
const DAY_MS = 86_400_000;
const dayNumber = (y: number, m: number, d: number) => Math.round(Date.UTC(y, m, d) / DAY_MS);

export function getSeasonalEventId(now = new Date()): SeasonalEventId | null {
  const today = dayNumber(now.getFullYear(), now.getMonth(), now.getDate());
  for (const id of Object.keys(SEASONAL_ANCHORS) as SeasonalEventId[]) {
    const { month, day, lastDay = day } = SEASONAL_ANCHORS[id];
    for (const year of [now.getFullYear(), now.getFullYear() - 1, now.getFullYear() + 1]) {
      if (id === "birthday" && year < FIRST_BIRTHDAY_YEAR) continue;
      const first = dayNumber(year, month - 1, day) - SEASONAL_WINDOW_DAYS;
      const last = dayNumber(year, month - 1, lastDay) + SEASONAL_WINDOW_DAYS;
      if (today >= first && today <= last) return id;
    }
  }
  return null;
}

export type SeasonalLanding = {
  title: string;
  /** Composer placeholder (same lines as the app's seasonal composer). */
  placeholder: string;
  /** Particle highlight + accent colour. */
  accent: string;
  /** Background glows: top, bottom-right. */
  glows: [string, string];
  /** Hero gradient stops. */
  gradient: [string, string, string];
};

export const DEFAULT_LANDING: SeasonalLanding = {
  title: "Learn smarter.",
  placeholder: "What do you want to learn today?",
  accent: "#2f2fba",
  glows: ["rgba(59,130,246,0.2)", "rgba(99,102,241,0.2)"],
  gradient: ["#060b18", "#0b132a", "#000000"],
};

export const SEASONAL_LANDING: Record<SeasonalEventId, SeasonalLanding> = {
  halloween: {
    title: "Frighteningly good.",
    placeholder: "Summon an answer…",
    accent: "#f97316",
    glows: ["rgba(249,115,22,0.22)", "rgba(124,58,237,0.24)"],
    gradient: ["#120a14", "#1a0f1f", "#000000"],
  },
  christmas: {
    title: "Merry and bright.",
    placeholder: "Ask anything, the elves are listening…",
    accent: "#dc2626",
    glows: ["rgba(220,38,38,0.2)", "rgba(22,163,74,0.2)"],
    gradient: ["#0d1410", "#121a14", "#000000"],
  },
  birthday: {
    title: "Another year smarter.",
    placeholder: "Bring a question to the party…",
    accent: "#ec4899",
    glows: ["rgba(236,72,153,0.2)", "rgba(250,204,21,0.16)"],
    gradient: ["#140a14", "#1a0f1c", "#000000"],
  },
  pi_day: {
    title: "Irrationally good.",
    placeholder: "Ask anything, irrational questions welcome…",
    accent: "#14b8a6",
    glows: ["rgba(20,184,166,0.2)", "rgba(99,102,241,0.2)"],
    gradient: ["#06141a", "#0b1a24", "#000000"],
  },
  star_wars: {
    title: "Learn, you will.",
    placeholder: "Ask anything, across the galaxy…",
    accent: "#facc15",
    glows: ["rgba(250,204,21,0.14)", "rgba(59,130,246,0.2)"],
    gradient: ["#05060d", "#0a0c18", "#000000"],
  },
  april_fools: {
    title: "Overthink less.",
    placeholder: "Ask anything (I’ll think about it way too much)…",
    accent: "#a855f7",
    glows: ["rgba(168,85,247,0.2)", "rgba(34,197,94,0.16)"],
    gradient: ["#0d0a18", "#130f24", "#000000"],
  },
};

export function getSeasonalLanding(now = new Date()): SeasonalLanding {
  const id = getSeasonalEventId(now);
  return id ? SEASONAL_LANDING[id] : DEFAULT_LANDING;
}
