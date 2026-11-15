/**
 * Acosta 2 launch gate for the landing page. The site is static, so this is checked on the
 * client: the server build always renders the pre-launch page, then the browser flips after
 * mount (and an open tab flips by itself at the release instant).
 *
 * Keep ACOSTA_2_RELEASE_ISO in sync with acosta-ai lib/acostaTeaser.ts.
 */
export const ACOSTA_2_RELEASE_ISO = "2026-11-16T12:00:00+11:00";
/** The temporary site-wide fire theme ends here (two weeks). The Acosta 2 section and badge stay, still in fire colours. */
export const ACOSTA_2_FIRE_THEME_END_ISO = "2026-11-30T12:00:00+11:00";

export const ACOSTA_2_RELEASE_AT = Date.parse(ACOSTA_2_RELEASE_ISO);
export const ACOSTA_2_FIRE_THEME_END_AT = Date.parse(ACOSTA_2_FIRE_THEME_END_ISO);

/** `?preview=acosta2` shows the post-launch page (with the fire theme) before the release. */
export function isAcosta2Preview(): boolean {
  if (typeof window === "undefined") return false;
  const raw = new URLSearchParams(window.location.search).get("preview");
  return raw?.toLowerCase().replace(/[-_\s]/g, "") === "acosta2";
}

export type Acosta2State = { released: boolean; fire: boolean };

export function getAcosta2State(now = Date.now(), preview = isAcosta2Preview()): Acosta2State {
  if (preview) return { released: true, fire: true };
  const released = now >= ACOSTA_2_RELEASE_AT;
  return { released, fire: released && now < ACOSTA_2_FIRE_THEME_END_AT };
}
