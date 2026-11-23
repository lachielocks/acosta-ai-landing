"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const TOAST_MS = 4000;

export function LandingRestoredToast() {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(() => searchParams.get("restored") === "1");

  useEffect(() => {
    if (!visible) return;

    const url = new URL(window.location.href);
    if (url.searchParams.get("restored") === "1") {
      url.searchParams.delete("restored");
      const qs = url.searchParams.toString();
      window.history.replaceState(null, "", qs ? `${url.pathname}?${qs}` : url.pathname);
    }

    const hide = window.setTimeout(() => setVisible(false), TOAST_MS);
    return () => window.clearTimeout(hide);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm text-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-300"
    >
      Landing page restored
    </div>
  );
}
