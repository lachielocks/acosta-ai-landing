const SCAN_INTRO_KEY = "acosta_scan_intro_pending";
let scanIntroPending = false;

const isScanSource = (pathname: string) =>
  pathname === "/thanks" || pathname === "/policies" || pathname.startsWith("/policies/");

/** Mark the next homepage mount for a scan intro when leaving Thanks or the Trust Centre. */
export function markScanIntroOnReturn(fromPath: string, toPath: string): void {
  if (!isScanSource(fromPath) || toPath !== "/") return;

  scanIntroPending = true;
  try {
    sessionStorage.setItem(SCAN_INTRO_KEY, "1");
  } catch {
    // The in-memory flag still covers client-side navigation when storage is unavailable.
  }
}

/** Consume the one-time request before ParticleText samples the hero title on mount. */
export function consumeScanIntroRequest(): boolean {
  let requested = scanIntroPending;
  scanIntroPending = false;

  try {
    requested ||= sessionStorage.getItem(SCAN_INTRO_KEY) === "1";
    sessionStorage.removeItem(SCAN_INTRO_KEY);
  } catch {
    // Storage may be disabled; fall back to the in-memory request.
  }

  return requested;
}

/** Read without consuming so React Strict Mode can safely evaluate an initializer twice. */
export function hasScanIntroRequest(): boolean {
  if (scanIntroPending) return true;
  try {
    return sessionStorage.getItem(SCAN_INTRO_KEY) === "1";
  } catch {
    return false;
  }
}
