import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { buildSkipLandingClearCookies } from "@/lib/skip-landing";

export const dynamic = "force-dynamic";

/** Clears the skip-landing cookie and returns the visitor to the landing page. */
export function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "?restored=1";

  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "private, no-store");
  const secure = request.nextUrl.protocol === "https:";
  for (const cookie of buildSkipLandingClearCookies({
    hostname: request.nextUrl.hostname,
    secure,
  })) {
    response.headers.append("Set-Cookie", cookie);
  }
  return response;
}
