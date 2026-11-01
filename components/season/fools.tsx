"use client";

import type React from "react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import DodgeFieldJs from "@/components/ui/DodgeField";

// React Bits ships it as JS; loosen the inferred props.
const DodgeField = DodgeFieldJs as unknown as React.ComponentType<Record<string, unknown>>;
import { useSeason } from "@/components/season/season-provider";

/** April Fools copy + chaos switches, or null on every other day. */
export function useFools() {
  const { theme, ready } = useSeason();
  return ready ? theme.fools ?? null : null;
}

/**
 * React Bits DodgeField around a NON-critical control, April Fools only.
 * Only reacts to a fine (mouse) pointer, gives up after `patience` dodges, and is
 * inert under prefers-reduced-motion. Keyboard (Tab + Enter) and touch hit the real link/button.
 */
export function FoolsDodge({
  children,
  width = 280,
  height = 96,
  patience = 2,
  className = "",
}: {
  children: ReactNode;
  width?: number | string;
  height?: number;
  patience?: number;
  className?: string;
}) {
  const fools = useFools();
  if (!fools) return <>{children}</>;
  return (
    <DodgeField
      className={`fools-dodge ${className}`}
      fieldHeight={height}
      reach={64}
      radius={110}
      patience={patience}
      style={{ width, maxWidth: "100%" }}
    >
      {children}
    </DodgeField>
  );
}

export function FoolsTicker() {
  const fools = useFools();
  if (!fools) return null;
  const items = [...fools.ticker, ...fools.ticker];
  return (
    <div className="fools-ticker" aria-hidden="true">
      <div className="fools-ticker__track">
        {items.map((t, i) => (
          <span key={i}>{t} <b>✦</b></span>
        ))}
      </div>
    </div>
  );
}

/** April Fools chaos: pricing scroll-back, bottom barrel roll, upside-down flips, emoji cursor, scroll "prompt", CTA confetti. Once per load each; off under reduced motion. */
export function FoolsChaos() {
  const fools = useFools();
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!fools) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.dataset.foolsCursor = "";
    const show = (t: string, ms = 1400) => { setToast(t); window.setTimeout(() => setToast(null), ms); };
    let scrolledBack = false, rolled = false, asked = false, timer = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (!asked && y > 400) { asked = true; show("Are you sure you want to scroll? (too late)", 1000); }
      const pricing = document.getElementById("pricing");
      if (!scrolledBack && pricing && !timer && pricing.getBoundingClientRect().bottom < 0) {
        timer = window.setTimeout(() => {
          scrolledBack = true;
          root.dataset.foolsScrollback = "1";
          show("wait, did you see the prices?");
          pricing.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1000);
      }
      if (!rolled && window.innerHeight + y >= document.documentElement.scrollHeight - 4) {
        rolled = true;
        root.dataset.foolsRolled = "1";
        const b = document.body;
        b.style.transformOrigin = `50% ${window.scrollY + window.innerHeight / 2}px`;
        root.style.overflow = "hidden"; b.style.overflow = "hidden";
        b.classList.add("fools-roll");
        window.setTimeout(() => {
          b.classList.remove("fools-roll");
          b.style.transformOrigin = ""; root.style.overflow = ""; b.style.overflow = "";
        }, 1050);
      }
    };
    const flip = window.setInterval(() => {
      const els = document.querySelectorAll<HTMLElement>("main p, main h3");
      const el = els[Math.floor(Math.random() * els.length)];
      if (!el || el.closest("[data-fools-calm]")) return;
      el.classList.add("fools-flip");
      window.setTimeout(() => el.classList.remove("fools-flip"), 900);
    }, 9000);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href*="app.acosta-ai.com"], button');
      if (!a) return;
      for (let i = 0; i < 14; i++) {
        const s = document.createElement("span");
        s.className = "fools-confetti";
        s.textContent = ["🎉", "🤡", "✨", "📚"][i % 4];
        s.style.left = `${e.clientX}px`; s.style.top = `${e.clientY}px`;
        s.style.setProperty("--dx", `${(Math.random() - 0.5) * 240}px`);
        s.style.setProperty("--dy", `${-60 - Math.random() * 160}px`);
        document.body.appendChild(s);
        window.setTimeout(() => s.remove(), 900);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("scroll", onScroll); document.removeEventListener("click", onClick, true);
      window.clearInterval(flip); window.clearTimeout(timer); delete root.dataset.foolsCursor;
    };
  }, [fools]);
  if (!fools) return null;
  return (
    <>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id="fools-wavy">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="1" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="6" />
        </filter>
      </svg>
      <div className="fools-crt" aria-hidden="true" />
      {toast && <div className="fools-toast" role="status">{toast}</div>}
    </>
  );
}
