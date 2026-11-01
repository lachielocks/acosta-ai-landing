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
  id: SeasonalEventId | null;
  title: string;
  /** Line under the hero title (null = the usual blurb only). */
  subtitle: string | null;
  heroBlurb: string;
  badge: string;
  placeholder: string;
  featuresEyebrow: string;
  featuresHeading: string;
  faqHeading: string;
  ctaHeading: [string, string];
  footerNote: string | null;
  /** Particle highlight + main accent. */
  accent: string;
  /** Second accent (gradients, alternating icons). */
  accent2: string;
  glows: [string, string];
  /** Hero gradient stops. */
  gradient: [string, string, string];
  /** Page background (dark). */
  page: string;
  decor: "embers" | "snow" | "confetti" | "stars" | "digits" | null;
};

export const DEFAULT_LANDING: SeasonalLanding = {
  id: null,
  title: "Learn smarter.",
  subtitle: null,
  heroBlurb: "Acosta AI is your private tutor, study partner and classroom assistant. Now with Pause: daily puzzles for a real study break.",
  badge: "Now with Acosta Pause",
  placeholder: "What do you want to learn today?",
  featuresEyebrow: "Features",
  featuresHeading: "Everything you need to excel.",
  faqHeading: "Common questions, clear answers.",
  ctaHeading: ["Ready to transform", "your learning?"],
  footerNote: null,
  accent: "#2563eb",
  accent2: "#4f46e5",
  glows: ["rgba(59,130,246,0.2)", "rgba(99,102,241,0.2)"],
  gradient: ["#060b18", "#0b132a", "#000000"],
  page: "oklch(0.06 0.008 260)",
  decor: null,
};

type SeasonEntry = Omit<SeasonalLanding, "id">;

export const SEASONAL_LANDING: Record<SeasonalEventId, SeasonEntry> = {
  halloween: {
    title: "Frighteningly good.",
    subtitle: "Happy Halloween!",
    heroBlurb: "Your private tutor and study partner, here for the late nights. Treats in the form of clear answers; no tricks.",
    badge: "Spooky season edition",
    placeholder: "Summon an answer…",
    featuresEyebrow: "Tricks of the trade",
    featuresHeading: "Everything you need to excel, even after dark.",
    faqHeading: "Burning questions, clear answers.",
    ctaHeading: ["Nothing scary", "about studying."],
    footerNote: "Happy Halloween from Acosta.",
    accent: "#f97316",
    accent2: "#7c3aed",
    glows: ["rgba(249,115,22,0.22)", "rgba(124,58,237,0.24)"],
    gradient: ["#140a12", "#1c0f1e", "#07040a"],
    page: "#07040a",
    decor: "embers",
  },
  christmas: {
    title: "Merry and bright.",
    subtitle: "Merry Christmas!",
    heroBlurb: "Your private tutor and study partner, holidays included. Go enjoy the break; we’ll be here when you need us.",
    badge: "Holiday edition",
    placeholder: "Ask anything, the elves are listening…",
    featuresEyebrow: "What’s under the tree",
    featuresHeading: "Everything you need to excel, wrapped up.",
    faqHeading: "Holiday questions, clear answers.",
    ctaHeading: ["Start the new year", "a step ahead."],
    footerNote: "Happy holidays from Acosta.",
    accent: "#ef4444",
    accent2: "#16a34a",
    glows: ["rgba(239,68,68,0.2)", "rgba(22,163,74,0.2)"],
    gradient: ["#0a120d", "#0f1a13", "#030605"],
    page: "#030605",
    decor: "snow",
  },
  birthday: {
    title: "Another year smarter.",
    subtitle: "Happy birthday, Acosta!",
    heroBlurb: "Created on 20 February 2026 and still learning every day. Bring your questions; we’ll bring the cake.",
    badge: "Birthday edition",
    placeholder: "Bring a question to the party…",
    featuresEyebrow: "A year of features",
    featuresHeading: "Everything you need to excel, one year better.",
    faqHeading: "Party questions, clear answers.",
    ctaHeading: ["Celebrate with", "a smarter study."],
    footerNote: "Thanks for a great year.",
    accent: "#ec4899",
    accent2: "#f59e0b",
    glows: ["rgba(236,72,153,0.2)", "rgba(245,158,11,0.16)"],
    gradient: ["#140a14", "#1a0f1c", "#060306"],
    page: "#060306",
    decor: "confetti",
  },
  pi_day: {
    title: "Irrationally good.",
    subtitle: "Happy Pi Day!",
    heroBlurb: "Your private tutor and study partner, with a soft spot for maths. 3.14159… and counting.",
    badge: "Pi Day edition",
    placeholder: "Ask anything, irrational questions welcome…",
    featuresEyebrow: "The full set",
    featuresHeading: "Everything you need to excel, to infinite digits.",
    faqHeading: "Common questions, rational answers.",
    ctaHeading: ["Make maths", "make sense."],
    footerNote: "Happy Pi Day from Acosta.",
    accent: "#14b8a6",
    accent2: "#6366f1",
    glows: ["rgba(20,184,166,0.2)", "rgba(99,102,241,0.2)"],
    gradient: ["#06141a", "#0b1a24", "#020608"],
    page: "#020608",
    decor: "digits",
  },
  star_wars: {
    title: "Learn, you will.",
    subtitle: "May the 4th be with you!",
    heroBlurb: "Your private tutor and study partner, across the galaxy. Procrastination is the path to the dark side.",
    badge: "Star Wars Day edition",
    placeholder: "Ask anything, across the galaxy…",
    featuresEyebrow: "Your toolkit",
    featuresHeading: "Everything you need to excel, light years ahead.",
    faqHeading: "Common questions, clear answers you will find.",
    ctaHeading: ["Strong with you,", "the study is."],
    footerNote: "May the 4th be with you.",
    accent: "#facc15",
    accent2: "#3b82f6",
    glows: ["rgba(250,204,21,0.14)", "rgba(59,130,246,0.2)"],
    gradient: ["#05060d", "#0a0c18", "#020206"],
    page: "#020206",
    decor: "stars",
  },
  april_fools: {
    title: "Overthink less.",
    subtitle: "Happy April Fools’!",
    heroBlurb: "Your private tutor and study partner. Today it may overthink things a little. Answers stay accurate; no joke.",
    badge: "Overthinking edition",
    placeholder: "Ask anything (I’ll think about it way too much)…",
    featuresEyebrow: "Seriously, features",
    featuresHeading: "Everything you need to excel. Really.",
    faqHeading: "Questions, answered (eventually).",
    ctaHeading: ["No tricks.", "Just better study."],
    footerNote: null,
    accent: "#a855f7",
    accent2: "#22c55e",
    glows: ["rgba(168,85,247,0.2)", "rgba(34,197,94,0.16)"],
    gradient: ["#0d0a18", "#130f24", "#04030a"],
    page: "#04030a",
    decor: "confetti",
  },
};

/** Shared with app.acosta-ai.com (lib/seasonalCookie.ts there): `{"o":"halloween","off":"halloween"}`. */
export const SEASONAL_COOKIE = "acosta_season";

function readSeasonalCookie(): { o?: string; off?: string } {
  if (typeof document === "undefined") return {};
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${SEASONAL_COOKIE}=`));
  if (!hit) return {};
  try {
    const v = JSON.parse(decodeURIComponent(hit.slice(SEASONAL_COOKIE.length + 1)));
    return v && typeof v === "object" ? v : {};
  } catch {
    return {};
  }
}

const isId = (v: unknown): v is SeasonalEventId => typeof v === "string" && v in SEASONAL_ANCHORS;

/**
 * Order: ?season= preview param (id or "none") → app dev override cookie → date window,
 * unless the app's switch turned this event off.
 */
export function resolveSeasonalEventId(now = new Date()): SeasonalEventId | null {
  if (typeof window !== "undefined") {
    const q = new URLSearchParams(window.location.search).get("season");
    if (q === "none") return null;
    if (isId(q)) return q;
  }
  const cookie = readSeasonalCookie();
  if (isId(cookie.o)) return cookie.o;
  const id = getSeasonalEventId(now);
  if (id && cookie.off === id) return null;
  return id;
}

export function getSeasonalLanding(id: SeasonalEventId | null): SeasonalLanding {
  return id ? { id, ...SEASONAL_LANDING[id] } : DEFAULT_LANDING;
}
