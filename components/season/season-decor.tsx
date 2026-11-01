"use client";

import { useMemo } from "react";
import { useSeason } from "./season-provider";

const GLYPHS: Record<string, string[]> = {
  digits: ["3", ".", "1", "4", "1", "5", "9", "2", "6", "5"],
};

/** A few slow drifting particles behind the page. CSS only; hidden for reduced motion. */
export function SeasonDecor() {
  const { theme } = useSeason();
  const bits = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const r = (n: number) => ((Math.sin(i * 9301 + n * 49297) + 1) / 2);
        return { left: r(1) * 100, delay: -r(2) * 24, dur: 18 + r(3) * 16, size: 2 + r(4) * 4, alt: i % 2 === 0 };
      }),
    [],
  );
  if (!theme.decor) return null;
  const glyphs = GLYPHS[theme.decor];
  return (
    <div aria-hidden="true" className={`season-decor season-decor--${theme.decor}`}>
      {bits.map((b, i) => (
        <span
          key={i}
          style={{
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
            width: glyphs ? undefined : b.size,
            height: glyphs ? undefined : b.size,
            fontSize: glyphs ? 10 + b.size * 2 : undefined,
            background: glyphs ? undefined : b.alt ? "var(--season-accent)" : "var(--season-accent-2)",
            color: glyphs ? (b.alt ? "var(--season-accent)" : "var(--season-accent-2)") : undefined,
          }}
        >
          {glyphs ? glyphs[i % glyphs.length] : null}
        </span>
      ))}
    </div>
  );
}
