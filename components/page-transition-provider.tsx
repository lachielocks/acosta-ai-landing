"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

const FADE_MS = 420;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const duration = reducedMotion ? 0 : FADE_MS;

  const [coverOn, setCoverOn] = useState(false);
  const pendingRevealRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealAfterRef = useRef<number>(0);

  useEffect(() => {
    if (!pendingRevealRef.current) return;
    const delay = Math.max(0, revealAfterRef.current - Date.now());
    if (delay === 0) {
      pendingRevealRef.current = false;
      setCoverOn(false);
      return;
    }
    if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    revealTimeoutRef.current = setTimeout(() => {
      revealTimeoutRef.current = null;
      pendingRevealRef.current = false;
      setCoverOn(false);
    }, delay);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const el = (e.target as HTMLElement | null)?.closest("a[href]");
      if (!el) return;

      const anchor = el as HTMLAnchorElement;
      if (anchor.getAttribute("download") != null) return;
      if (anchor.target === "_blank") return;

      const hrefAttr = anchor.getAttribute("href");
      if (hrefAttr == null || hrefAttr === "" || hrefAttr.startsWith("javascript:")) return;
      if (hrefAttr.startsWith("mailto:") || hrefAttr.startsWith("tel:")) return;

      let next: URL;
      try {
        next = new URL(hrefAttr, window.location.href);
      } catch {
        return;
      }

      if (next.origin !== window.location.origin) return;

      const current = new URL(window.location.href);
      if (next.pathname === current.pathname && next.search === current.search) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);

      if (duration === 0) {
        pendingRevealRef.current = true;
        revealAfterRef.current = 0;
        router.push(next.pathname + next.search + next.hash);
        return;
      }

      setCoverOn(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
            pendingRevealRef.current = true;
            revealAfterRef.current = 0;
            router.push(next.pathname + next.search + next.hash);
          }, duration);
        });
      });
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [duration, router]);

  useEffect(() => {
    const onPopState = () => {
      if (duration === 0) return;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);

      setCoverOn(true);
      pendingRevealRef.current = true;
      // Popstate already changed the URL; hold black briefly, then fade in.
      revealAfterRef.current = Date.now() + duration;
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [duration]);

  return (
    <>
      {children}
      <div
        aria-hidden
        className={`fixed inset-0 z-[100] bg-black transition-opacity ease-in-out ${
          coverOn ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          transitionDuration: `${duration}ms`,
        }}
      />
    </>
  );
}
