"use client";

import { useEffect, useState } from "react";
import {
  readPlatformUserFromCookie,
  type PlatformUser,
} from "@/lib/platform-user";

/**
 * Reads the shared `acosta_user` cookie set by platform.acosta-ai.com
 * (Domain=.acosta-ai.com). Re-reads on focus / visibility so returning from
 * the platform updates CTAs without a hard refresh.
 */
export function usePlatformUser() {
  const [user, setUser] = useState<PlatformUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const refresh = () => setUser(readPlatformUserFromCookie());

    refresh();
    setReady(true);

    const onFocus = () => refresh();
    const onVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    const onPageShow = () => refresh();

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);

    // Short delayed re-read: cookie may land just after navigating back from platform.
    const t1 = window.setTimeout(refresh, 400);
    const t2 = window.setTimeout(refresh, 1500);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return {
    user,
    ready,
    isSignedIn: Boolean(user),
  };
}
