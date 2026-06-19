"use client";

import { useEffect, useState } from "react";
import {
  readPlatformUserFromCookie,
  type PlatformUser,
} from "@/lib/platform-user";

export function usePlatformUser() {
  const [user, setUser] = useState<PlatformUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readPlatformUserFromCookie());
    setReady(true);

    const onFocus = () => setUser(readPlatformUserFromCookie());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return {
    user,
    ready,
    isSignedIn: Boolean(user),
  };
}
