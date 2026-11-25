"use client";

import { cameFromScanPage } from "@/lib/nav-history";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import ParticleText from "@/components/ui/ParticleText";

/**
 * Hero headline drawn by React Bits ParticleText.
 *
 * The title box keeps the layout. The particle canvas is a 100vw-wide overlay centred on that
 * box, tall enough to cover the whole viewport plus a margin (so scatter, the spiral intro, bursts and glow aren't clipped),
 * stacked above the other hero elements, with pointer-events: none so it never blocks
 * the CTAs or nav. A transparent hit area over the title box forwards pointer
 * events to the canvas, so hover, repel and clickBurst still work on the text.
 */
// Intro length = stagger + gatherDuration (ParticleText has no completion callback).
const GATHER_MS = 3400;
const STAGGER_MS = 850;
/** Start fading the rest of the page in at ~78% of the gather (fade itself is 800ms in CSS). */
const REVEAL_AT_MS = Math.round((GATHER_MS + STAGGER_MS) * 0.78);

/**
 * Title box height: just the rendered glyph height plus a little room for strokes/glow, so the
 * settled text sits ~48–64px from the pill and subtitle. The text renders at ~10vw tall
 * (auto-fit to width) and caps at ~8.25rem once the 11rem font-size max kicks in.
 */
const BOX_HEIGHT = "calc(min(10vw, 8.25rem) + 56px)";

/** Extra canvas beyond the viewport edges so the spiral runs off-screen rather than stopping at a line. */
const OVERLAY_MARGIN = 120;

/** Spiral spread, from the viewport, so the intro vortex fills most of the screen. */
function viewportScatter() {
  if (typeof window === "undefined") return 240;
  return Math.round(Math.min(window.innerWidth, window.innerHeight) * 0.9);
}

export function HeroParticleTitle({ text, highlightColor = "#2f2fba", onIntroEnd }: { text: string; highlightColor?: string; onIntroEnd?: () => void }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const [scatter] = useState(viewportScatter);
  // Return from Thanks or the Trust Centre with a quick scan-in instead of the full vortex.
  const [intro] = useState<"spiral" | "scan">(() => (typeof window !== "undefined" && cameFromScanPage() ? "scan" : "spiral"));
  useEffect(() => {
    document.documentElement.dataset.heroIntro = intro;
  }, [intro]);
  const boxRef = useRef<HTMLDivElement>(null);
  // Overlay height: centred on the title (the text is drawn at the canvas centre) and tall enough
  // to reach past both the top and bottom of the viewport, wherever the title sits. A plain 100vh
  // overlay ended above the viewport bottom because the title sits above the viewport middle.
  const [overlayH, setOverlayH] = useState<number | null>(null);
  useEffect(() => {
    const measure = () => {
      const box = boxRef.current;
      if (!box) return;
      const r = box.getBoundingClientRect();
      const cy = r.top + window.scrollY + r.height / 2; // page-relative, so scroll doesn't change it
      const reach = Math.max(cy, window.innerHeight - cy) + OVERLAY_MARGIN;
      setOverlayH((prev) => (prev === null || Math.abs(prev - 2 * reach) > 40 ? Math.round(2 * reach) : prev));
    };
    measure();
    let lastW = window.innerWidth;
    const onResize = () => { if (window.innerWidth !== lastW) { lastW = window.innerWidth; measure(); } };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
    <div ref={boxRef} className="relative mx-auto" style={{ width: "100%", height: BOX_HEIGHT }}>
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none absolute z-30 text-white"
        style={{ left: "50%", top: "50%", width: "100vw", height: overlayH ?? "100vh", transform: "translate(-50%, -50%)" }}
      >
        {overlayH !== null && <ParticleText
          text={text}
          maxDpr={1.5}
          particleSize={1.5}
          density={2}
          color="currentColor"
          highlightColor={highlightColor}
          highlightMode="gradient"
          shape="line"
          intro={intro}
          onIntroEnd={onIntroEnd}
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
        />}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 z-30"
        // Full viewport width so the hit area covers the whole rendered text, which can be wider than the box.
        style={{ left: "50%", width: "100vw", transform: "translateX(-50%)", touchAction: "pan-y" }}
        onPointerEnter={forward}
        onPointerMove={forward}
        onPointerLeave={forward}
        onPointerDown={forward}
        onClick={forward}
      />
    </div>
  );
}
