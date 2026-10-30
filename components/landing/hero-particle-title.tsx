"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import ParticleText from "@/components/ui/ParticleText";

/**
 * Hero headline drawn by React Bits ParticleText.
 *
 * The title box keeps the layout. The particle canvas is a 100vw x 100vh overlay
 * centred on that box (so scatter, the spiral intro, bursts and glow aren't clipped),
 * stacked above the other hero elements, with pointer-events: none so it never blocks
 * the CTAs or nav. A transparent hit area over the title box forwards pointer
 * events to the canvas, so hover, repel and clickBurst still work on the text.
 */
// Intro length = stagger + gatherDuration (ParticleText has no completion callback).
const GATHER_MS = 3400;
const STAGGER_MS = 850;
/** Start fading the rest of the page in at ~78% of the gather (fade itself is 800ms in CSS). */
const REVEAL_AT_MS = Math.round((GATHER_MS + STAGGER_MS) * 0.78);

/** Title box height: grows with the font so the settled text doesn't crowd the subtitle. */
const BOX_HEIGHT = "clamp(240px, 30vw, 440px)";

/** Spiral spread, from the viewport, so the intro vortex fills most of the screen. */
function viewportScatter() {
  if (typeof window === "undefined") return 240;
  return Math.round(Math.min(window.innerWidth, window.innerHeight) * 0.9);
}

export function HeroParticleTitle({ text }: { text: string }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const [scatter] = useState(viewportScatter);

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
    <div className="relative mx-auto" style={{ width: "100%", height: BOX_HEIGHT }}>
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none absolute z-30 text-white"
        style={{ left: "50%", top: "50%", width: "100vw", height: "100vh", transform: "translate(-50%, -50%)" }}
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
          scatter={scatter}
          gatherDuration={3400}
          stagger={850}
          clickBurst
          burstStrength={1.7}
          pointerRepel={30}
          repelRadius={150}
          idleDrift={1.3}
          trigger="mount"
          fontSize="clamp(3rem, 14.5vw, 11rem)"
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
