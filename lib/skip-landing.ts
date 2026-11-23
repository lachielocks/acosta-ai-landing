/** Cookie that sends acosta-ai.com visitors straight to the app. Shared with app.acosta-ai.com. */
export const SKIP_LANDING_COOKIE = "acosta_skip_landing";
export const SKIP_LANDING_VALUE = "1";
export const SKIP_LANDING_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
export const APP_ORIGIN = "https://app.acosta-ai.com";

const SHARED_DOMAIN = ".acosta-ai.com";

function isProductionAcostaHost(host: string): boolean {
  const h = host.toLowerCase().replace(/\.$/, "");
  return h === "acosta-ai.com" || h.endsWith(".acosta-ai.com");
}

export function skipLandingSharedDomain(host?: string): string | undefined {
  if (!host) return undefined;
  if (isProductionAcostaHost(host)) return SHARED_DOMAIN;
  return undefined;
}

export function isSkipLandingCookieValue(value: string | undefined | null): boolean {
  return value === SKIP_LANDING_VALUE;
}

function cookieString(value: string, maxAge: number, domain?: string, secure?: boolean): string {
  const parts = [
    `${SKIP_LANDING_COOKIE}=${value}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "SameSite=Lax",
  ];
  if (domain) parts.push(`Domain=${domain}`);
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

export function buildSkipLandingCookie(opts: {
  enabled: boolean;
  domain?: string;
  secure?: boolean;
}): string {
  if (!opts.enabled) return cookieString("", 0, opts.domain, opts.secure);
  return cookieString(SKIP_LANDING_VALUE, SKIP_LANDING_MAX_AGE, opts.domain, opts.secure);
}

/** Expire host-only and shared-domain copies so a stale cookie cannot shadow the new value. */
export function buildSkipLandingClearCookies(opts: {
  hostname?: string;
  secure?: boolean;
}): string[] {
  const { hostname, secure } = opts;
  const headers = [
    buildSkipLandingCookie({ enabled: false, secure }),
    buildSkipLandingCookie({ enabled: false, domain: SHARED_DOMAIN, secure }),
    buildSkipLandingCookie({ enabled: false, domain: "acosta-ai.com", secure }),
  ];
  if (hostname) {
    headers.push(buildSkipLandingCookie({ enabled: false, domain: hostname, secure }));
  }
  return headers;
}

function currentHost(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.hostname;
}

function isHttps(): boolean {
  return typeof window !== "undefined" && window.location.protocol === "https:";
}

export function readSkipLandingCookie(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${SKIP_LANDING_COOKIE}=`));
  if (!match) return false;
  return isSkipLandingCookieValue(match.slice(SKIP_LANDING_COOKIE.length + 1));
}

export function writeSkipLandingCookie(enabled: boolean): void {
  if (typeof document === "undefined") return;
  try {
    const secure = isHttps();
    const host = currentHost();
    for (const cookie of buildSkipLandingClearCookies({ hostname: host, secure })) {
      document.cookie = cookie;
    }
    if (!enabled) return;
    document.cookie = buildSkipLandingCookie({
      enabled: true,
      domain: skipLandingSharedDomain(host),
      secure,
    });
  } catch {
    /* cookies unavailable */
  }
}

const skipLandingListeners = new Set<() => void>();

function emitSkipLandingChange(): void {
  for (const listener of skipLandingListeners) listener();
}

export function subscribeSkipLandingCookie(listener: () => void): () => void {
  skipLandingListeners.add(listener);
  return () => {
    skipLandingListeners.delete(listener);
  };
}

export function setSkipLandingCookie(enabled: boolean): void {
  writeSkipLandingCookie(enabled);
  emitSkipLandingChange();
}
