/**
 * Previous in-site path, so the hero can pick its entry effect.
 * In memory for client-side navigation (a reload starts fresh, so reloads always get the vortex).
 * sessionStorage only covers a back/forward document load (e.g. /policies opened directly, then Back).
 */
const CUR = "acosta_nav_path";
let memCur: string | null = null;
let memPrev: string | null = null;

const isTrust = (p: string | null) => !!p && (p === "/policies" || p.startsWith("/policies/"));

function navType(): string {
  try {
    const e = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    return e?.type ?? "navigate";
  } catch {
    return "navigate";
  }
}

/** Last path from the previous document in this tab, read once before it is overwritten. */
let docPrev: string | null | undefined;
function readDocPrev(): string | null {
  if (docPrev === undefined) {
    try {
      docPrev = sessionStorage.getItem(CUR);
    } catch {
      docPrev = null;
    }
  }
  return docPrev;
}

export function recordPath(pathname: string): void {
  readDocPrev();
  if (memCur !== pathname) {
    memPrev = memCur;
    memCur = pathname;
  }
  try {
    sessionStorage.setItem(CUR, pathname);
  } catch {
    /* storage unavailable */
  }
}

export function cameFromTrustCentre(): boolean {
  if (memPrev !== null) return isTrust(memPrev); // client-side nav in this document
  // First page of this document: only a Back/Forward load from the Trust Centre counts.
  return navType() === "back_forward" && isTrust(readDocPrev());
}
