import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  APP_ORIGIN,
  SKIP_LANDING_COOKIE,
  isSkipLandingCookieValue,
} from "./lib/skip-landing";

/**
 * If the skip-landing cookie is set, send only the root `/` to the app
 * before the landing page renders. /pause, /privacy, sitemap, robots and
 * assets are left alone. `?stay=1` skips the redirect once and keeps the cookie.
 */
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  if (pathname !== "/") return NextResponse.next();
  if (searchParams.get("stay") === "1") return NextResponse.next();
  if (!isSkipLandingCookieValue(request.cookies.get(SKIP_LANDING_COOKIE)?.value)) {
    return NextResponse.next();
  }

  const response = NextResponse.redirect(APP_ORIGIN, 307);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  // Exact root only. Other routes must stay crawlable and reachable.
  matcher: "/",
};
