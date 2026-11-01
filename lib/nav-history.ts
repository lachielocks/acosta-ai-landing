/** Remembers the previous in-site path (per tab) so the hero can pick its entry effect. */
const CUR = "acosta_nav_path";
const PREV = "acosta_nav_prev";

export function recordPath(pathname: string): void {
  try {
    const cur = sessionStorage.getItem(CUR);
    if (cur === pathname) return; // reload: keep the existing previous path
    sessionStorage.setItem(PREV, cur ?? "");
    sessionStorage.setItem(CUR, pathname);
  } catch {
    /* storage unavailable */
  }
}

export function cameFromTrustCentre(): boolean {
  try {
    const prev = sessionStorage.getItem(PREV) ?? "";
    return prev === "/policies" || prev.startsWith("/policies/");
  } catch {
    return false;
  }
}
