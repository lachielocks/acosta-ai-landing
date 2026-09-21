export const APP_URL = "https://app.acosta-ai.com";
export const PLATFORM_URL = APP_URL;

export function getPlatformSubscriptionUrl(plan: PlatformPlan): string {
  if (plan === "free") return PLATFORM_URL;
  return `${PLATFORM_URL}/?subscription=${plan}`;
}

/**
 * Set by app.acosta-ai.com on `.acosta-ai.com`:
 * `{ "displayName": "Lachie", "plan": "go" }`
 *
 * `plan` accepts: `free`, `go`, `max` (case-insensitive; `go_monthly` etc. also work).
 */
export const PLATFORM_USER_COOKIE = "acosta_user";

export type PlatformPlan = "free" | "go" | "max";

export type PlatformUser = {
  displayName: string;
  plan?: PlatformPlan;
};

const PLAN_ORDER: Record<PlatformPlan, number> = {
  free: 0,
  go: 1,
  max: 2,
};

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  if (!match) return null;

  const raw = match.slice(name.length + 1);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function normalizePlatformPlan(raw?: string | null): PlatformPlan | undefined {
  if (!raw) return undefined;

  const normalized = raw.toLowerCase().trim().replace(/[\s-]+/g, "_");

  if (normalized === "free" || normalized === "free_plan") return "free";
  if (normalized.startsWith("go")) return "go";
  if (normalized.startsWith("max")) return "max";

  return undefined;
}

export function formatPlanLabel(plan: PlatformPlan): string {
  return { free: "Free", go: "Go", max: "Max" }[plan];
}

export function readPlatformUserFromCookie(): PlatformUser | null {
  const raw = getCookieValue(PLATFORM_USER_COOKIE);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as {
      displayName?: string;
      name?: string;
      plan?: string;
    };
    const displayName = parsed.displayName?.trim() || parsed.name?.trim();
    if (!displayName) return null;

    const plan = normalizePlatformPlan(parsed.plan);

    return plan ? { displayName, plan } : { displayName };
  } catch {
    const displayName = raw.trim();
    return displayName ? { displayName } : null;
  }
}

export function getPlatformCtaLabels(user: PlatformUser | null) {
  if (!user) {
    return {
      nav: "Try Acosta",
      planLabel: null as string | null,
      primary: "Get started free",
      primaryShort: "Get Started",
      cta: "Get Started Now",
      pricingIntro: null as string | null,
    };
  }

  const firstName = user.displayName.split(/\s+/)[0] ?? user.displayName;
  const planLabel = user.plan ? `${formatPlanLabel(user.plan)} plan` : null;

  if (!user.plan) {
    return {
      nav: `Hi, ${firstName}`,
      planLabel: null,
      primary: "Open App",
      primaryShort: "Open App",
      cta: "Open App",
      pricingIntro: null,
    };
  }

  if (user.plan === "free") {
    return {
      nav: `Hi, ${firstName}`,
      planLabel,
      primary: "Open App",
      primaryShort: "Open App",
      cta: "Upgrade to Go",
      pricingIntro: "You're on Free — pick a plan when you're ready to unlock more.",
    };
  }

  if (user.plan === "go") {
    return {
      nav: `Hi, ${firstName}`,
      planLabel,
      primary: "Open App",
      primaryShort: "Open App",
      cta: "Open App",
      pricingIntro: "You're on Go — Max unlocks unlimited usage across every tool.",
    };
  }

  return {
    nav: `Hi, ${firstName}`,
    planLabel,
    primary: "Open App",
    primaryShort: "Open App",
    cta: "Open App",
    pricingIntro: "You're on Max — everything unlimited, already included.",
  };
}

export function getPricingCardCta(
  user: PlatformUser | null,
  cardPlan: PlatformPlan,
  defaultCta: string
): string {
  if (!user?.plan) return defaultCta;
  if (user.plan === cardPlan) return "Open App";

  if (PLAN_ORDER[cardPlan] > PLAN_ORDER[user.plan]) {
    return cardPlan === "go" ? "Upgrade to Go" : "Upgrade to Max";
  }

  return "Open App";
}

export function isCurrentPlan(user: PlatformUser | null, cardPlan: PlatformPlan): boolean {
  return user?.plan === cardPlan;
}

export function planToKey(name: string): PlatformPlan {
  return name.toLowerCase() as PlatformPlan;
}
