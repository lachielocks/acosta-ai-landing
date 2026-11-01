"use client";

import type React from "react";
import type { ReactNode } from "react";
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
