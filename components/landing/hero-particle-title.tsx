"use client";

import { useEffect, useRef, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import ParticleText from "@/components/ui/ParticleText";

/**
 * Hero headline drawn by React Bits ParticleText.
 *
 * The 360px box keeps the layout. The particle canvas is an oversized overlay
 * centred on that box (so scatter, the spiral intro, bursts and glow aren't clipped),
 * stacked above the other hero elements, with pointer-events: none so it never blocks
 * the CTAs or nav. A transparent hit area over the 360px box forwards pointer
 * events to the canvas, so hover, repel and clickBurst still work on the text.
 */
// Intro length = stagger + gatherDuration (ParticleText has no completion callback).
const GATHER_MS = 3400;
const STAGGER_MS = 850;
/** Start fading the rest of the page in at ~78% of the gather (fade itself is 800ms in CSS). */
const REVEAL_AT_MS = Math.round((GATHER_MS + STAGGER_MS) * 0.78);

const BLEED_Y = 260; // ≥ scatter (240) so the spiral/scatter never hits the canvas edge

export function HeroParticleTitle({ text }: { text: string }) {
  const layerRef = useRef<HTMLDivElement>(null);

  // Reveal the rest of the homepage near the end of the vortex. CSS hides it from first paint
  // and has its own 5s fallback, so this only ever brings the reveal forward.
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.dataset.intro = "done";
      return;
    }
    let timer = 0;
    let cancelled = false;
    // The intro starts once fonts are ready (ParticleText waits for them before sampling).
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (!cancelled) timer = window.setTimeout(() => { root.dataset.intro = "done"; }, REVEAL_AT_MS);
    });
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, []);

  // Re-dispatch the hit area's pointer events on the canvas (same clientX/Y, so the
  // component's own handlers compute positions exactly as if the canvas were hit).
  const forward = (e: ReactPointerEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement>) => {
    const canvas = layerRef.current?.querySelector("canvas");
    if (!canvas) return;
    const type = e.type === "mouseenter" ? "pointerenter" : e.type === "mouseleave" ? "pointerleave" : e.type;
    const init = {
      clientX: e.clientX,
      clientY: e.clientY,
      pointerId: 1,
      pointerType: "pointerType" in e ? e.pointerType : "mouse",
      isPrimary: true,
    };
    canvas.dispatchEvent(type === "click" ? new MouseEvent("click", init) : new PointerEvent(type, init));
  };

  return (
    <div className="relative mx-auto" style={{ width: "100%", height: 360 }}>
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none absolute z-30 text-white"
        style={{ left: "50%", top: -BLEED_Y, width: "100vw", height: 360 + BLEED_Y * 2, transform: "translateX(-50%)" }}
      >
        <ParticleText
          text={text}
          particleSize={1.5}
          density={2}
          color="currentColor"
          highlightColor="#2f2fba"
          highlightMode="gradient"
          shape="line"
          intro="spiral"
          scatter={240}
          gatherDuration={3400}
          stagger={850}
          clickBurst
          burstStrength={1.7}
          pointerRepel={30}
          repelRadius={150}
          idleDrift={1.3}
          trigger="mount"
          fontSize="clamp(3rem, 12vw, 8rem)"
          fontWeight={800}
          fontFamily="inherit"
          glow
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-30"
        style={{ touchAction: "pan-y" }}
        onPointerEnter={forward}
        onPointerMove={forward}
        onPointerLeave={forward}
        onPointerDown={forward}
        onClick={forward}
      />
    </div>
  );
}
