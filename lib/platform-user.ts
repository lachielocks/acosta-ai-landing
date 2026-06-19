export const PLATFORM_URL = "https://platform.acosta-ai.com";

/** Set by platform.acosta-ai.com on `.acosta-ai.com` — JSON: { "displayName": "Lachie" } */
export const PLATFORM_USER_COOKIE = "acosta_user";

export type PlatformUser = {
  displayName: string;
};

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
}

export function readPlatformUserFromCookie(): PlatformUser | null {
  const raw = getCookieValue(PLATFORM_USER_COOKIE);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as { displayName?: string; name?: string };
    const displayName = parsed.displayName?.trim() || parsed.name?.trim();
    if (!displayName) return null;
    return { displayName };
  } catch {
    const displayName = raw.trim();
    return displayName ? { displayName } : null;
  }
}

export function getPlatformCtaLabels(user: PlatformUser | null) {
  if (!user) {
    return {
      nav: "Try Acosta",
      primary: "Get started free",
      primaryShort: "Get Started",
      cta: "Get Started Now",
    };
  }

  const firstName = user.displayName.split(/\s+/)[0] ?? user.displayName;

  return {
    nav: `Hi, ${firstName}`,
    primary: "Open Platform",
    primaryShort: "Open Platform",
    cta: "Open Platform",
  };
}
