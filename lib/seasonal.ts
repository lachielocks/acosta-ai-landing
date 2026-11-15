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
  /** "acosta2" is the temporary Acosta 2 launch fire theme (see lib/acosta2.ts), not a yearly event. */
  id: SeasonalEventId | "acosta2" | null;
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
  /** Whole-page copy rewrite + chaos mode (April Fools only). Prices, plan names and limits never change. */
  fools?: FoolsCopy;
};

export type FoolsCopy = {
  nav: Record<"features" | "testimonials" | "pricing" | "faq" | "trust" | "cta", string>;
  ticker: string[];
  heroPrimary: string;
  heroSecondary: string;
  heroSecondaryCaught: string;
  heroStats: { value: string; label: string }[];
  featuresIntro: string;
  /** Keyed by the normal feature title. */
  features: Record<string, { title: string; description: string }>;
  testimonialsEyebrow: string;
  pricingEyebrow: string;
  pricingHeading: [string, string];
  /** Keyed by plan name. */
  plans: Record<string, { tagline: string; cta: string }>;
  founderHeading: [string, string];
  founderSub: string;
  founderMission: string;
  founderSignoff: string;
  trustEyebrow: string;
  faqEyebrow: string;
  jokeFaq: { question: string; answer: string };
  ctaButton: string;
  footerBlurb: string;
  footerMirror: string;
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

/**
 * Temporary Acosta 2 launch theme: the whole page goes ember orange. Switched on by the
 * release gate in lib/acosta2.ts and switched off at ACOSTA_2_FIRE_THEME_END_ISO.
 * A real seasonal event (or ?season=) always wins over it.
 */
export const ACOSTA_2_FIRE_LANDING: SeasonalLanding = {
  ...DEFAULT_LANDING,
  id: "acosta2",
  subtitle: "Acosta 2 is here.",
  heroBlurb: "Acosta AI is your private tutor, study partner and classroom assistant. Now with Acosta 2: meet Spark, Ember and Blaze.",
  badge: "Acosta 2 is here",
  faqHeading: "Burning questions, clear answers.",
  ctaHeading: ["Your next chapter", "starts here."],
  accent: "#f97316",
  accent2: "#dc2626",
  glows: ["rgba(249,115,22,0.24)", "rgba(220,38,38,0.22)"],
  gradient: ["#1a0805", "#220a05", "#0a0302"],
  page: "#0b0403",
  decor: "embers",
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
    title: "Lowkey smart.",
    subtitle: "Happy April Fools’!",
    heroBlurb: "Your private tutor, study partner and classroom assistant. The website is having a day. The app is completely fine, we checked twice.",
    badge: "Now with 0% new features",
    placeholder: "ask anything (it’s a bit)",
    featuresEyebrow: "Stuff it does",
    featuresHeading: "Everything you need to excel, explained badly.",
    faqHeading: "Questions you were too scared to ask.",
    ctaHeading: ["Stop scrolling.", "Start studying. (after this)"],
    footerNote: "Happy April Fools’.",
    fools: {
      nav: { features: "Stuff it does", testimonials: "Vibe checks", pricing: "The damage", faq: "Questions (real)", trust: "Trust Centre (no jokes)", cta: "Get started fr" },
      ticker: [
        "BREAKING: local website discovers Comic Sans",
        "prices on this page are real, the vibes are not",
        "please drink some water",
        "the app is normal today, only the website is unwell",
        "one (1) button will run away from you. once.",
        "back to normal in a couple of days",
        "this ticker has no purpose and we respect that",
      ],
      heroPrimary: "Get started free (actually free)",
      heroSecondary: "See features",
      heroSecondaryCaught: "ok fine, click me",
      heroStats: [
        { value: "Pause", label: "Daily puzzles, for when this website is too much" },
        { value: "Study", label: "Flashcards, planner, quizzes. The normal kind." },
        { value: "Exam-ready", label: "Simulations and marking. No pranks in there." },
      ],
      featuresIntro: "Chat, exam prep, study tools, classes and proper breaks. Same features as yesterday, worse fonts.",
      features: {
        "Chat that teaches": { title: "Yap machine (educational)", description: "Fast, Core and Thinking modes, all with live web search. Thinking shows its working, which is more than your group chat does." },
        "Reads your stuff": { title: "Reads your stuff", description: "Drop in PDFs, photos of your chaotic handwritten notes or a YouTube link and get the key ideas, summaries and questions back." },
        "Exam practice": { title: "Exam jumpscares (practice)", description: "Timed exam simulations, or snap a finished paper and get it marked with feedback. Better to panic here than in the real one." },
        "Study tools": { title: "Study tools & a garden", description: "Planner, flashcards, Mind Dump, study groups and Study Garden, where plants grow while you focus. Touching grass, digitally." },
        "Classes & Teach": { title: "Teacher mode (no detentions)", description: "Teachers run classes, assign tasks and Live Quizzes, and prep, adapt and wrap up lessons with AI help." },
        Pause: { title: "Approved procrastination", description: "Five daily puzzles: Sudoku, a mini crossword, Shift, Orbit and Echo, plus AI challenges. Guilt sold separately." },
        "Acosta Guardian": { title: "The ‘go to bed’ feature", description: "Guardian notices long sessions and late nights and nudges you to take a break. Like a parent, but it doesn’t sigh." },
        "Learning Mode": { title: "No-spoilers mode", description: "Learning Mode guides you to the answer instead of handing it over, so the work stays yours. Annoying? Slightly. Good for you? Yes." },
        Ignite: { title: "Ignite (human-checked)", description: "Community study resources, checked by an actual human before they go live. Available in selected regions." },
      },
      testimonialsEyebrow: "Vibe checks (real quotes, unedited, we didn’t prank these)",
      pricingEyebrow: "The damage",
      pricingHeading: ["Learn with", "questionable fonts."],
      plans: {
        Free: { tagline: "Costs $0. Not a bit. Genuinely zero.", cta: "Get started (free fr)" },
        Go: { tagline: "For people who own a planner and open it.", cta: "Go go go" },
        Max: { tagline: "For people who say ‘unlimited’ a lot.", cta: "Choose Max (main character)" },
      },
      founderHeading: ["Built by a student,", "instead of doing homework. (jk… mostly)"],
      founderSub: "One person. One mission. Too many browser tabs.",
      founderMission: "Our mission (no jokes in this box)",
      founderSignoff: "Made with purpose, not profit. And Comic Sans, today only.",
      trustEyebrow: "Trust (the one section we didn’t mess with)",
      faqEyebrow: "FAQ (mostly real)",
      jokeFaq: {
        question: "Is the website broken? [April Fools’ question]",
        answer: "No. It’s April Fools’. The fonts, the wonky cards and the button that runs away are on purpose and go back to normal in a couple of days. The app, the prices and everything below this question are completely real.",
      },
      ctaButton: "Get started (no tricks)",
      footerBlurb: "Private, student-first AI. The website is joking today; the Privacy Policy isn’t.",
      footerMirror: "All rights reserved. (it’s backwards. you’re welcome.)",
    },
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
    const raw = new URLSearchParams(window.location.search).get("season");
    // Accept loose spellings too: aprilfools, april-fools, starwars, pi-day…
    const q = raw && (isId(raw) ? raw : (Object.keys(SEASONAL_ANCHORS) as SeasonalEventId[]).find((id) => id.replace(/_/g, "") === raw.toLowerCase().replace(/[-_\s]/g, "")) ?? raw);
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
